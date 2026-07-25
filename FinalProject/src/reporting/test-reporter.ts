import type { APIResponse, Page, Response as BrowserResponse, TestInfo } from '@playwright/test';
import type { FrameworkEnvironment } from '../config/environment.js';

const MAX_ATTACHMENT_BYTES = 100_000;
type ReportableResponse = APIResponse | BrowserResponse;

export interface ApiExchangeOptions {
    includeBody?: boolean;
}

export class TestReporter {
    public constructor(
        private readonly testInfo: TestInfo,
        private readonly environment: FrameworkEnvironment
    ) {}

    public async attachRunContext(): Promise<void> {
        await this.attachJson('Execution context', {
            test: this.testInfo.titlePath.join(' > '),
            project: this.testInfo.project.name,
            retry: this.testInfo.retry,
            workerIndex: this.testInfo.workerIndex,
            targetName: this.environment.targetName,
            uiBaseUrl: this.environment.uiBaseUrl,
            apiBaseUrl: this.environment.apiBaseUrl,
            uiApiBaseUrl: this.environment.uiApiBaseUrl
        });
    }

    public async attachOutcome(): Promise<void> {
        await this.attachJson('Execution outcome', {
            status: this.testInfo.status,
            expectedStatus: this.testInfo.expectedStatus,
            durationMs: this.testInfo.duration,
            errors: this.testInfo.errors.map((error) => ({
                message: error.message,
                stack: error.stack
            }))
        });
    }

    public async attachApiExchange(name: string, response: ReportableResponse, options: ApiExchangeOptions = {}): Promise<void> {
        const includeBody = options.includeBody ?? true;
        const rawBody = includeBody ? await response.body() : undefined;
        const isTruncated = rawBody !== undefined && rawBody.length > MAX_ATTACHMENT_BYTES;
        const bodyText = rawBody?.subarray(0, MAX_ATTACHMENT_BYTES).toString('utf8');
        let body: unknown = bodyText;

        if (bodyText !== undefined) {
            try {
                body = JSON.parse(bodyText);
            } catch {
                // Keep a non-JSON response as readable text in the report.
            }
        }

        await this.attachJson(`API exchange - ${name}`, {
            request: {
                method: this.isBrowserResponse(response) ? response.request().method() : 'GET',
                url: response.url(),
                body: this.isBrowserResponse(response) ? this.parseRequestBody(response.request().postData()) : null
            },
            response: {
                status: response.status(),
                statusText: response.statusText(),
                headers: response.headers(),
                body: includeBody ? body : '[Redacted: response body is not attached for sensitive security evidence]',
                capturedBodyBytes: rawBody?.length ?? 0,
                contentLengthHeader: response.headers()['content-length'] ?? null,
                isBodyTruncated: isTruncated
            }
        });
    }

    public async attachScreenshot(name: string, page: Page): Promise<void> {
        const safeName = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        const screenshotPath = this.testInfo.outputPath(`${safeName}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await this.attachFile(name, screenshotPath, 'image/png');
    }

    public async attachFile(name: string, filePath: string, contentType?: string): Promise<void> {
        await this.testInfo.attach(name, { path: filePath, contentType });
    }

    public async attachText(name: string, content: string): Promise<void> {
        await this.testInfo.attach(name, { body: Buffer.from(content), contentType: 'text/plain' });
    }

    private async attachJson(name: string, payload: unknown): Promise<void> {
        await this.testInfo.attach(name, {
            body: Buffer.from(JSON.stringify(payload, null, 2)),
            contentType: 'application/json'
        });
    }

    private isBrowserResponse(response: ReportableResponse): response is BrowserResponse {
        return 'request' in response;
    }

    private parseRequestBody(body: string | null): unknown {
        if (body === null) return null;
        try {
            return JSON.parse(body);
        } catch {
            return body;
        }
    }
}

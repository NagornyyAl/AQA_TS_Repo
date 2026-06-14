import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function loadLocalEnv(filePath = path.resolve(process.cwd(), '.env')): void {
    if (!existsSync(filePath)) {
        return;
    }

    const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            continue;
        }

        const delimiterIndex = trimmedLine.indexOf('=');

        if (delimiterIndex === -1) {
            continue;
        }

        const key = trimmedLine.slice(0, delimiterIndex).trim();
        const value = trimmedLine.slice(delimiterIndex + 1).trim();

        process.env[key] ??= value.replace(/^["']|["']$/g, '');
    }
}

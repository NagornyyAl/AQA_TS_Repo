export interface FrameworkEnvironment {
    targetName: string;
    uiBaseUrl: string;
    apiBaseUrl: string;
    uiApiBaseUrl: string;
}

export const environment: FrameworkEnvironment = {
    targetName: 'primary-resources',
    uiBaseUrl: process.env.PST_UI_URL ?? 'https://practicesoftwaretesting.com',
    apiBaseUrl: process.env.PST_API_URL ?? 'https://api-v2.practicesoftwaretesting.com',
    uiApiBaseUrl: process.env.PST_UI_API_URL ?? 'https://api.practicesoftwaretesting.com'
};

export const defectEnvironment: FrameworkEnvironment = {
    targetName: 'optional-intentional-bug-demo',
    uiBaseUrl: process.env.PST_BUG_UI_URL ?? 'https://with-bugs.practicesoftwaretesting.com',
    apiBaseUrl: process.env.PST_BUG_API_URL ?? 'https://api-with-bugs.practicesoftwaretesting.com',
    uiApiBaseUrl: process.env.PST_BUG_API_URL ?? 'https://api-with-bugs.practicesoftwaretesting.com'
};

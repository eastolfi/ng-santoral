interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;
    // Add your environment variables below
    // readonly NG_APP_API_URL: string;
    [key: string]: string;
    readonly NG_APP_AUTH0_DOMAIN: string;
    readonly NG_APP_AUTH0_CLIENT_ID: string;
    readonly NG_APP_AUTH0_AUDIENCE: string;
    readonly NG_APP_API_BASE_URL: string;
}

export const environment = {
    production: import.meta.env.NG_APP_ENV,
    auth0domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
    auth0client: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
    auth0audience: import.meta.env.NG_APP_AUTH0_AUDIENCE,
    apiUrl: import.meta.env.NG_APP_API_BASE_URL,
    enableLocalServiceWorker: import.meta.env.NG_APP_ENABLE_LOCAL_SERVICE_WORKER,
  };

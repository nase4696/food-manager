export function getSentryBaseOptions() {
  const nodeEnv = process.env.NODE_ENV ?? "development";

  const environment =
    process.env.SENTRY_ENVIRONMENT ?? process.env.VERCEL_ENV ?? nodeEnv;

  const isProduction = environment === "production";

  const enabled =
    (process.env.SENTRY_ENABLED ??
      process.env.NEXT_PUBLIC_ENABLE_SENTRY ??
      (isProduction ? "true" : "false")) === "true";

  const dsn = enabled
    ? (process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN)
    : undefined;

  const release =
    process.env.SENTRY_RELEASE ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.NEXT_PUBLIC_APP_VERSION ??
    "0.1.0";

  const tracesSampleRate = isProduction ? 0.1 : 1.0;

  const debug =
    (process.env.SENTRY_DEBUG ?? (isProduction ? "false" : "true")) === "true";

  return {
    dsn,
    enabled,
    environment,
    release,
    debug,
    tracesSampleRate,

    sendDefaultPii: false,

    ignoreErrors: [
      "ResizeObserver loop limit exceeded",
      "NetworkError when attempting to fetch resource.",
    ],
  };
}

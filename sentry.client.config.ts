import * as Sentry from "@sentry/nextjs";

import { getSentryBaseOptions } from "./src/lib/sentry/options";

const base = getSentryBaseOptions();

Sentry.init({
  ...base,

  // ✅ 無料運用ならリプレイは本番だけ、さらに低率がおすすめ
  replaysSessionSampleRate: base.environment === "production" ? 0.01 : 0.0,
  replaysOnErrorSampleRate: base.environment === "production" ? 0.1 : 0.0,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
});

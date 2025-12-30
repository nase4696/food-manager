import * as Sentry from "@sentry/nextjs";

import { getSentryBaseOptions } from "./src/lib/sentry/options";

console.error("Sentry server init");

Sentry.init({
  ...getSentryBaseOptions(),
});

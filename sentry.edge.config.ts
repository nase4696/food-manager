import * as Sentry from "@sentry/nextjs";

import { getSentryBaseOptions } from "./src/lib/sentry/options";

Sentry.init({
  ...getSentryBaseOptions(),
});

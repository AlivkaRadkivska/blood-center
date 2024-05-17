import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://09cd2d792287f62931a6bca963ba0f31@o4507261939548160.ingest.de.sentry.io/4507261950296144',
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  spotlight: process.env.NODE_ENV === 'production',
});

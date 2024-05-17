import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: 'https://09cd2d792287f62931a6bca963ba0f31@o4507261939548160.ingest.de.sentry.io/4507261950296144',
      tracesSampleRate: 1,
      debug: false,
      spotlight: process.env.NODE_ENV === 'production',
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: 'https://09cd2d792287f62931a6bca963ba0f31@o4507261939548160.ingest.de.sentry.io/4507261950296144',
      tracesSampleRate: 1,
      debug: false,
      spotlight: process.env.NODE_ENV === 'production',
    });
  }
}

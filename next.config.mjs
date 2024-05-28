import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default withSentryConfig(nextConfig, {
  org: 'alina-xl',
  project: 'blood-center',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  transpileClientSDK: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  telemetry: false,
});

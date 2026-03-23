import '@testing-library/jest-dom';
import React from 'react';

// Allow router mocks.
// eslint-disable-next-line no-undef
jest.mock('next/router', () => require('next-router-mock'));

// Avoid ESM parsing issues in Jest for Vercel client components.
// eslint-disable-next-line no-undef
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => React.createElement(React.Fragment),
}));

// eslint-disable-next-line no-undef
jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => React.createElement(React.Fragment),
}));

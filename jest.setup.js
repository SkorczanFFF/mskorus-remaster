import React from 'react';
import '@testing-library/jest-dom';

// Allow router mocks.

jest.mock('next/router', () => require('next-router-mock'));

// Avoid ESM parsing issues in Jest for Vercel client components.

jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => React.createElement(React.Fragment),
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: () => React.createElement(React.Fragment),
}));

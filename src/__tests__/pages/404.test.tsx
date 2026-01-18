import { render } from '@testing-library/react';

import NotFoundPage from '@/pages/404';

describe('404', () => {
  it('renders a heading', () => {
    const { getByText } = render(<NotFoundPage />);

    const heading = getByText(/not found/i);

    expect(heading).toBeInTheDocument();
  });
});

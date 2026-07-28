import Link from 'next/link';
import React from 'react';

export default function ScrollButton() {
  return (
    <Link
      className='scroll-arrow'
      href='/#services'
      scroll={false}
      aria-label='Przejdź do sekcji usług'
    >
      <span />
      <span />
      <span />
    </Link>
  );
}

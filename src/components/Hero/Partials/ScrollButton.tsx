import Link from 'next/link';
import React from 'react';

export default function ScrollButton() {
  return (
    <Link className='scroll-arrow' href='/#about' scroll={false}>
      <span />
      <span />
      <span />
    </Link>
  );
}

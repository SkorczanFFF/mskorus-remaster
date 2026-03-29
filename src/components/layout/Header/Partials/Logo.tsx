import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='font-unica font-bold select-none' aria-label='SKOFTware - Back to home'>
      <span className='text-2xl'>
        <span
          className='text-orange'
          style={{
            textShadow:
              '0 0 1px rgb(6, 16, 49), 0 0 30px rgba(236, 236, 236, 0.3)',
          }}
        >
          SKO
        </span>
        <span
          className='text-raspberry'
          style={{
            textShadow:
              '0 0 1px rgb(6, 16, 49), 0 0 30px rgba(236, 236, 236, 0.3)',
          }}
        >
          FT
        </span>
        <span
          className='text-primary-blue'
          style={{
            textShadow:
              '0 0 2px rgb(102, 102, 102), 0 0 50px rgba(236, 236, 236, 0.3)',
          }}
        >
          ware
        </span>
      </span>
    </Link>
  );
}

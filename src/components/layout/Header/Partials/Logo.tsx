import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='font-unica font-bold select-none'>
      <span className='text-2xl' style={{ textShadow: '0 0 2px rgb(231, 231, 231), 0 0 30px rgba(236, 236, 236, 0.3)' }}>
        <span className='text-orange'>SKO</span>
        <span className='text-raspberry'>FT</span>
        <span className='text-primary-blue'>ware</span>
      </span>
      <span
        className='block text-[8px] tracking-[4.7px] text-white -mt-[10px]'
        style={{ textShadow: '0 0 8px rgba(0,26,37,0.8), 0 0 20px rgba(0,26,37,0.5)' }}
      >
        Maciej Skorus
      </span>
    </Link>
  );
}

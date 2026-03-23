interface MobileProps {
  isMenuOpen: boolean;
  handleClick: () => void;
}

export default function Mobile({
  isMenuOpen,
  handleClick,
}: MobileProps): React.JSX.Element {
  return (
    <button
      onClick={handleClick}
      className='relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden'
      aria-label='Toggle Menu'
    >
      <span
        className={`h-[2px] w-6 transform bg-real-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
      />
      <span
        className={`h-[2px] w-6 bg-real-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`h-[2px] w-6 transform bg-real-white transition-all duration-300 ease-in-out ${isMenuOpen
            ? '-translate-y-[7px] -rotate-45'
            : ''
          }`}
      />
    </button>
  );
}

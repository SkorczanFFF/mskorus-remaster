import React from 'react';

import { useLocale } from '@/locale/LocaleContext';

interface MobileProps {
  isMenuOpen: boolean;
  handleClick: () => void;
}

const Mobile = React.forwardRef<HTMLButtonElement, MobileProps>(
  ({ isMenuOpen, handleClick }, ref) => {
    const { t } = useLocale();
    return (
      <button
        ref={ref}
        onClick={handleClick}
        aria-expanded={isMenuOpen}
        className='relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 drop-shadow-[0_3px_4px_#001A2566] lg:hidden'
        aria-label={t.toggleMenu}
      >
        <span
          className={`h-[2px] w-6 transform bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`h-[2px] w-6 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-[2px] w-6 transform bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </button>
    );
  },
);

Mobile.displayName = 'Mobile';
export default Mobile;

import React from 'react';

export interface PortfolioCardLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface PortfolioCardProps {
  title: string;
  tech: string;
  description: React.ReactNode;
  links?: PortfolioCardLink[];
  className?: string;
}

export default function PortfolioCard({
  title,
  tech,
  description,
  links = [],
  className = '',
}: PortfolioCardProps): React.JSX.Element {
  return (
    <div
      className={`flex w-full max-w-[1500px] flex-col items-center justify-center gap-2 border-[gradient] p-6 text-white shadow-xl md:p-10 bg-[#001b26] ${className}`}
    >
      <div className='flex w-full items-center justify-between'>
        <div className='flex flex-col'>
          <h4 className='text-xl font-[500] uppercase'>{title}</h4>
          <p className='text-[14px] text-[#b6b6b6]'>{tech}</p>
        </div>
        {links.length > 0 && (
          <div className='flex gap-5'>
            {links.map(({ href, label, icon }) => (
              <a
                key={href + label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-oranger flex cursor-pointer items-center gap-2 duration-150 hover:text-white'
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className='text-justify font-[300] leading-5'>
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
    </div>
  );
}

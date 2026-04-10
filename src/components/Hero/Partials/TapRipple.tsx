import React from 'react';

export type Ripple = { id: number; x: number; y: number };

// CSS-only ripple at each click position; reinforces tap → 3D wave feedback.
export default function TapRipple({ ripples }: { ripples: Ripple[] }) {
  return (
    <div className='pointer-events-none fixed inset-0 z-30'>
      {ripples.map((r) => (
        <span
          key={r.id}
          className='absolute block rounded-full border-2 border-orange/80'
          style={{
            left: r.x - 14,
            top: r.y - 14,
            width: 28,
            height: 28,
            animation: 'tapRipple 700ms ease-out forwards',
          }}
        />
      ))}
      <style>{`@keyframes tapRipple {
        0%   { transform: scale(0.3); opacity: 1; }
        60%  { opacity: 0.6; }
        100% { transform: scale(4); opacity: 0; }
      }`}</style>
    </div>
  );
}

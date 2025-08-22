import React from 'react';
// No i18n needed for aria here; brand is language-agnostic
import LogoSrc from '../../assets/icons/Logo.svg';

// Navbar Logo component that renders the provided SVG file
export default function Logo({ className = '', size = 120, alt, ...props }) {
  const aria = alt || 'Selora — Logo';

  return (
    <img
      src={LogoSrc}
      alt={aria}
      className={`block ${className}`}
      style={{ width: size, height: 'auto' }}
      loading="eager"
      decoding="sync"
      {...props}
    />
  );
}

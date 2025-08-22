import React from 'react';
import { useTranslation } from 'react-i18next';
import LogoSrc from '../../assets/icons/Logo.svg';

// Navbar Logo component that renders the provided SVG file
export default function Logo({ className = '', size = 120, alt, ...props }) {
  const { i18n } = useTranslation();
  const isHu = i18n.language?.slice(0, 2) === 'hu';
  const aria = alt || (isHu ? 'Győri Mihály — Logo' : 'Mihaly Gyori — Logo');

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

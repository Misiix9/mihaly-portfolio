import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (window.innerWidth <= 768);

    // Don't initialize cursor on mobile devices
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Magnetic effect for interactive elements
    const handleMouseEnter = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const target = t.closest('[data-magnetic]');
      if (!target) return;

      setCursorText(target.dataset.cursorText || '');
      
      gsap.to(cursor, {
        scale: target.dataset.cursorScale || 2,
        duration: 0.3,
        ease: "power2.out"
      });

      const magneticForce = parseFloat(target.dataset.magnetic) || 0.3;
      
      const handleMagneticMove = (e) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        gsap.to(target, {
          x: deltaX * magneticForce,
          y: deltaY * magneticForce,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      target.addEventListener('mousemove', handleMagneticMove);
      target._magneticHandler = handleMagneticMove;
    };

    const handleMouseLeave = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const target = t.closest('[data-magnetic]');
      if (!target) return;

      setCursorText('');
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });

      if (target._magneticHandler) {
        target.removeEventListener('mousemove', target._magneticHandler);
        delete target._magneticHandler;
      }
    };

    // Animation loop for smooth cursor follow
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        xPercent: -50,
        yPercent: -50
      });

      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
        xPercent: -50,
        yPercent: -50
      });

      requestAnimationFrame(animateCursor);
    };

    // Start animation loop
    animateCursor();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      // Clean up any remaining magnetic handlers
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        if (el._magneticHandler) {
          el.removeEventListener('mousemove', el._magneticHandler);
          delete el._magneticHandler;
        }
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-90 blur-sm" />
        {/* Cursor text */}
        {cursorText && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white whitespace-nowrap pointer-events-none">
            {cursorText}
          </div>
        )}
      </div>
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9998] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>
    </>
  );
};

export default MagneticCursor;

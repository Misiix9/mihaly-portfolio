import clsx from 'classnames'

export default function Button({
  as = 'button',
  href,
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) {
  const base = 'inline-flex items-center justify-center rounded-[var(--radius-md)] border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50';

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const variants = {
    primary: 'bg-white text-black border-transparent hover:bg-white/90',
    secondary: 'bg-[var(--bg-soft)] text-white border-[var(--border)] hover:bg-white/10',
    ghost: 'bg-transparent text-white border-[var(--border)] hover:bg-white/10',
  };

  const Comp = as === 'a' ? 'a' : 'button';

  return (
    <Comp
      href={as === 'a' ? href : undefined}
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

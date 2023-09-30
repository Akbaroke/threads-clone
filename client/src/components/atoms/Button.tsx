import cn from '@/utils/cn';

type Props = {
  type?: 'button' | 'submit';
  variant?: 'fill' | 'outline';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export default function Button({
  type = 'button',
  variant = 'fill',
  className,
  onClick,
  children,
  isDisabled,
  isLoading,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={cn(
        'w-full py-1 px-2 sm:py-2 sm:px-4 rounded-lg sm:rounded-xl text-[12px] sm:text-[14px] font-semibold',
        {
          'bg-black text-white ': variant === 'fill',
          'bg-white text-black border border-gray-200': variant === 'outline',
        },
        className
      )}>
      {children}
    </button>
  );
}
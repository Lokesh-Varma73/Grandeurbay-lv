
import { LucideProps } from 'lucide-react';

export const PaypalIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || 'currentColor'}
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 11l5-1 1-5c0-2-2-3-4-3S5 3 5 5l-2 7" />
      <path d="M13.77 11.12c1.79.32 3.03 1.94 3.03 3.83 0 2.05-1.66 3.7-3.7 3.7H7.73a2.04 2.04 0 0 1-2.03-1.75L4.75 11" />
    </svg>
  );
};

export default PaypalIcon;

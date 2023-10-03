import LOGO from '@/assets/threads-logo.png';
import Image from 'next/image';

type Props = {
  children: React.ReactNode;
  tittle: string;
  oAuth?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function CardAuth({ children, tittle, oAuth, footer }: Props) {
  return (
    <div className="w-full p-10 m-auto sm:shadow-xl rounded-xl sm:max-w-md my-14">
      <div className="flex flex-col items-center gap-2">
        <Image src={LOGO} alt="logo" className="w-[35px]" />
        <h1 className="font-bold text-[22px]">{tittle}</h1>
      </div>
      <div className="flex flex-col gap-6 my-6">
        {oAuth}
        {oAuth && (
          <div className="flex items-center gap-2 [&>span]:w-full [&>span]:border [&>span]:border-gray-100 [&>span]:h-max [&>span]:rounded-full text-[14px] font-semibold">
            <span></span>
            <p>Or</p>
            <span></span>
          </div>
        )}
      </div>
      {children}
      <div className="my-3">{footer}</div>
    </div>
  );
}

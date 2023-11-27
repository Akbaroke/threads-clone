import Image from 'next/image';
import Link from 'next/link';

export interface LinkPreviewInterface {
  description: string;
  domain: string;
  favicon: string;
  image: string;
  ogUrl: string;
  sitename: string;
  success: boolean;
  title: string;
  type: string;
}

export default function LinkPreview({ data }: { data: LinkPreviewInterface }) {
  return (
    <Link
      href={data.ogUrl}
      className="max-w-[300px] rounded-lg border border-gray-300 overflow-hidden">
      <div className="h-[150px]">
        <Image
          src={data.image}
          width={100}
          height={100}
          alt="foto"
          className="object-center h-full w-full object-cover"
        />
      </div>
      <div className="px-4 py-3">
        <p className="text-gray-500 text-[12px]">{data.domain}</p>
        <h1 className="text-[14px] font-medium">{data.title}</h1>
      </div>
    </Link>
  );
}

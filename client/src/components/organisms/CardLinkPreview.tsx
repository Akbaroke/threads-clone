import { LinkPreview } from '@/hooks/useLinkPreview';
import { Link } from 'react-router-dom';

export default function CardLinkPreview({ data }: { data: LinkPreview }) {
  return (
    <Link
      to={data.ogUrl}
      className="max-w-[300px] rounded-lg border border-gray-300 overflow-hidden">
      <div className="h-[150px]">
        <img
          src={data.image}
          alt=""
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

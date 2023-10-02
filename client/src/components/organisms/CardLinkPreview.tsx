import { LinkPreview } from '@/hooks/useLinkPreview';

export default function CardLinkPreview({ data }: { data: LinkPreview }) {
  return (
    <div>
      <img src={data.image} alt="" />
    </div>
  );
}

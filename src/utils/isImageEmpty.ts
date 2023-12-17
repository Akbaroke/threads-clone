import { DEFAULT_PROFILE_PICTURE } from '@/assets';
import { StaticImageData } from 'next/image';

export default function isImageEmpty(imageUrl?: string): string | StaticImageData {
  if (!imageUrl || imageUrl === '' || imageUrl.length === 0) {
    return DEFAULT_PROFILE_PICTURE;
  }

  return imageUrl;
}

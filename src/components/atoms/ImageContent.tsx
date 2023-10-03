import cn from '@/utils/cn';
import { Skeleton } from '@mantine/core';
import { Image } from 'primereact/image';
import { useState } from 'react';
import LazyLoad from 'react-lazy-load';

function ImageContent({
  image,
  classNames,
}: {
  image: string;
  classNames?: string;
}) {
  const [isLoadedContent, setIsLoadedContent] = useState(true);

  return (
    <div className="rounded-lg h-max">
      <Skeleton
        className={`w-[150px] h-[210px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[420px] rounded-lg opacity-50 blur-sm ${
          !isLoadedContent && 'hidden'
        }`}
      />
      <LazyLoad>
        <Image
          src={image}
          alt=""
          className={cn(
            'overflow-hidden rounded-lg shadow-md bg-gray-200/50 [&>img]:object-center [&>img]:object-fill [&>img]:w-full [&>img]:h-full',
            'w-[150px] h-[210px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[420px] border',
            classNames
          )}
          preview
          onLoadCapture={() => setIsLoadedContent(false)}
        />
      </LazyLoad>
    </div>
  );
}

export default ImageContent;

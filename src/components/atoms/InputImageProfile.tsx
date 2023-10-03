import * as React from 'react';
import { Loader } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { FiImage } from 'react-icons/fi';
import { useHover } from '@mantine/hooks';
import cn from '@/utils/cn';
import Image from 'next/image';

interface InputProps {
  value: string;
  errorLabel?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  onChange: (e: FileWithPath | string) => void;
}

const InputImageProfile: React.FC<InputProps> = ({
  value,
  errorLabel,
  isLoading,
  onChange,
}) => {
  const [error, setError] = React.useState('');
  const [blob, setBlob] = React.useState<string>();
  const { hovered, ref } = useHover();

  React.useEffect(() => {
    setBlob(value);
  }, [value]);

  const handleDrop = (e: FileWithPath[]) => {
    const file = e[0];

    if (file.size > 1000000) {
      setError('File tidak boleh melebihi 1MB');
      onChange('');
      setBlob('');
    } else {
      setBlob(URL.createObjectURL(file));
      onChange(file);
      setError('');
    }
  };

  return (
    <div className="flex flex-col my-2 relative gap-1 items-center">
      <div ref={ref} className="rounded-full h-max w-max">
        <Dropzone
          p={15}
          disabled={isLoading}
          accept={IMAGE_MIME_TYPE}
          onDrop={handleDrop}
          onErrorCapture={() => console.log('File tidak boleh melebihi 1MB')}
          className={cn(
            'border border-two border-dashed rounded-full grid place-items-center min-h-[100px] w-max p-0',
            {
              'cursor-not-allowed': isLoading,
            }
          )}>
          {blob ? (
            <Image
              src={blob}
              alt="Preview"
              width={100}
              height={100}
              className="w-[120px] h-[120px] rounded-full shadow-xl"
            />
          ) : (
            <div className="flex flex-col gap-1 items-center">
              <FiImage className="text-[20px] text-two text-gray-300" />
              <p className="text-two text-[12px] text-gray-300">Max 1 MB</p>
            </div>
          )}
          {isLoading ? (
            <div className="absolute right-0 left-0 bottom-0 bg-black/50 w-[120px] h-[120px] rounded-full shadow-xl flex flex-col items-center justify-center gap-1">
              <Loader color="#eaeaea" size="sm" />
            </div>
          ) : (
            hovered && (
              <div className="absolute right-0 left-0 bottom-0 bg-black/50 w-[120px] h-[120px] rounded-full shadow-xl flex flex-col items-center justify-center gap-1">
                <FiImage className="text-[20px] text-gray-300" />
                <p className="text-two text-[12px] text-gray-300">Max 1 MB</p>
              </div>
            )
          )}
        </Dropzone>
      </div>
      {errorLabel || error ? (
        <p className="text-red-500 text-[12px]">{errorLabel || error}</p>
      ) : null}
    </div>
  );
};

export default InputImageProfile;

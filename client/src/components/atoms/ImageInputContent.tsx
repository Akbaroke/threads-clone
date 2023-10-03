import * as React from 'react';
import { Loader } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import cn from '@/utils/cn';
import { BiImageAdd } from 'react-icons/bi';

interface InputProps {
  errorLabel?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  onChange: (e: FileWithPath | string) => void;
}

const ImageInputContent: React.FC<InputProps> = ({
  errorLabel,
  isLoading,
  onChange,
}) => {
  const [error, setError] = React.useState('');

  const handleDrop = (e: FileWithPath[]) => {
    const file = e[0];

    if (file.size > 1000000) {
      setError('File tidak boleh melebihi 1MB');
      onChange('');
    } else {
      // onBlob(URL.createObjectURL(file));
      onChange(file);
      setError('');
    }
  };

  return (
    <div className="flex flex-col relative gap-1 items-center">
      <div className="rounded-full h-max w-max">
        <Dropzone
          disabled={isLoading}
          accept={IMAGE_MIME_TYPE}
          onDrop={handleDrop}
          onErrorCapture={() => console.log('File tidak boleh melebihi 1MB')}
          className={cn(
            'border border-two border-dashed rounded-lg grid place-items-center w-[150px] h-[210px] md:w-[200px] md:h-[280px] lg:w-[300px] lg:h-[420px] p-0',
            {
              'cursor-not-allowed': isLoading,
            }
          )}>
          <div className="flex flex-col gap-1 items-center">
            <BiImageAdd className="text-[20px] text-two text-gray-300" />
            <p className="text-two text-[12px] text-gray-300">Max.1 MB</p>
          </div>
          {isLoading && (
            <div className="absolute right-0 left-0 bottom-0 bg-black/50 w-[120px] h-[120px] rounded-full shadow-xl flex flex-col items-center justify-center gap-1">
              <Loader color="#eaeaea" size="sm" />
            </div>
          )}
        </Dropzone>
      </div>
      {errorLabel || error ? (
        <p className="text-red-500 text-[12px]">{errorLabel || error}</p>
      ) : null}
    </div>
  );
};

export default ImageInputContent;

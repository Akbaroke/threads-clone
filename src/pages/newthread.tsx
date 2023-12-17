import axios from '@/axios';
import { HeadMetaData } from '@/components/HeadMetaData';
import Button from '@/components/atoms/Button';
import InputTags, { DataTags } from '@/components/atoms/InputTags';
import ModalImageProfile from '@/components/molecules/ModalImageProfile';
import Layout from '@/components/templates/Layout';
import { RootState } from '@/store';
import cn from '@/utils/cn';
import { Container, Textarea, Transition } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { MdOutlineAttachFile } from 'react-icons/md';
import ImageContent from '@/components/atoms/ImageContent';
import InputImageContent from '@/components/atoms/InputImageContent';
import isImageEmpty from '@/utils/isImageEmpty';
import { errorMessage } from '@/utils/error';
import { toastError, toastSuccess } from '@/components/atoms/Toast';

type ContentImageType = {
  id: number;
  blob: string;
  file: FileWithPath;
};

export default function Newthread() {
  const { push } = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState<string>('');
  const [isWithImage, setIsWithImage] = useState<boolean>(false);
  const [contentImage, setContentImage] = useState<ContentImageType[]>([]);
  const [hastag, setHastag] = useState<DataTags[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (content.length > 0 || contentImage.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [content, contentImage]);

  useEffect(() => {
    setContentImage([]);
  }, [isWithImage]);

  const handleSendClick = async () => {
    const data = {
      content: content,
      images: contentImage.map((image) => image.file),
      tags: hastag,
    };
    console.log(data);
    try {
      await axios.post(`/content?user_id=${user?.userId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      push('/home');
      toastSuccess('Content created successfully.', 'create-content');
    } catch (error) {
      toastError(errorMessage(error), 'create-content');
      console.log(error);
    }
  };

  const handleDeleteImage = (id: number) => {
    setContentImage(contentImage.filter((image) => image.id !== id));
  };

  return (
    <Layout>
      <HeadMetaData title="Home" />
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <RxCross2
              size={22}
              onClick={() => push('/home')}
              className="cursor-pointer hover:scale-110 transition-all duration-300"
            />
            <h1 className="font-bold text-[16px] sm:text-[18px]">New Thread</h1>
          </div>
          <button
            className={cn(
              'font-bold text-[16px] sm:text-[18px] cursor-pointer',
              {
                'text-gray-400': !isFormValid,
              }
            )}
            onClick={handleSendClick}
            disabled={!isFormValid}>
            Done
          </button>
        </div>
        <div className="flex flex-col">
          <div className="relative z-10 flex justify-between gap-3">
            <div className="relative w-max">
              <ModalImageProfile imgSrc={user?.image || ''}>
                <Image
                  src={isImageEmpty(user?.image)}
                  alt={user?.username || ''}
                  className="rounded-full w-[50px] h-[50px] object-cover bg-gray-200"
                />
              </ModalImageProfile>
            </div>
            <div className="flex items-start justify-between flex-1 h-max">
              <div className="flex items-center gap-1">
                <h1 className="font-semibold">{user?.username}</h1>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-3 ml-16 -top-6 z-20">
            <div className="flex flex-col mt-2 mb-2">
              <Textarea
                placeholder="Start a thread..."
                variant="unstyled"
                autosize
                autoFocus
                className="[&>div>textarea]:p-0"
                minRows={2}
                onChange={(e) => setContent(e.target.value)}
              />
              <InputTags datas={[]} placeholder="#" setHastag={setHastag} />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className={`w-max sm:p-2 p-2 ${isWithImage ? 'shadow-md' : ''}`}
                onClick={() => setIsWithImage(!isWithImage)}>
                <MdOutlineAttachFile
                  size={20}
                  className={`rotate-45 ${isWithImage ? '' : 'text-gray-400'}`}
                />
              </Button>
              {/* <Button variant="outline" className="w-max sm:p-2 p-2">
              <HiCode
                size={20}
                onClick={handleSendClick}
                className="text-gray-400"
              />
            </Button> */}
            </div>

            <div className="overflow-x-scroll no-scrollbar">
              <Container size="xs" mx={0}>
                <div className="flex gap-4 w-max">
                  {contentImage?.map((value, index) => (
                    <div key={index} className="relative">
                      <ImageContent image={value.blob} />
                      <div
                        className="absolute text-white transition-all duration-300 bg-black/50 rounded-full cursor-pointer top-1 right-1 hover:scale-110"
                        onClick={() => handleDeleteImage(value.id)}>
                        <RxCross2 size={16} />
                      </div>
                    </div>
                  ))}
                  {contentImage.length < 5 && (
                    <Transition
                      mounted={isWithImage}
                      transition="slide-up"
                      duration={400}
                      timingFunction="ease">
                      {(styles) => (
                        <div style={styles}>
                          <InputImageContent
                            onChange={(e) =>
                              setContentImage([
                                ...contentImage,
                                {
                                  id: contentImage.length + 1,
                                  blob: URL.createObjectURL(e as FileWithPath),
                                  file: e as FileWithPath,
                                },
                              ])
                            }
                          />
                        </div>
                      )}
                    </Transition>
                  )}
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

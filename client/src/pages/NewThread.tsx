import ModalProfilePicture from '@/components/molecules/ModalProfilePicture';
import { RootState } from '@/redux/store';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Textarea, Transition } from '@mantine/core';
import { useEffect, useState } from 'react';
import { MdOutlineAttachFile } from 'react-icons/md';
// import { HiCode } from 'react-icons/hi';
import Button from '@/components/atoms/Button';
import ImageContent from '@/components/atoms/ImageContent';
import ImageInputContent from '@/components/atoms/ImageInputContent';
import { FileWithPath } from '@mantine/dropzone';
import cn from '@/utils/cn';
import axios from 'axios';
import InputMultiSelect from '@/components/atoms/InputMultiSelect';

type ContentImageType = {
  id: number;
  blob: string;
  file: FileWithPath;
};

export default function NewThread() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState<string>('');
  const [isWithImage, setIsWithImage] = useState<boolean>(false);
  const [contentImage, setContentImage] = useState<ContentImageType[]>([]);
  const [hastag, setHastag] = useState<string[]>([]);
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
    const time = Math.floor(new Date().getTime() / 1000.0);
    const data = {
      username: user?.username,
      imageProfile: user?.image,
      isVerified: true,
      content: {
        text: content,
        images: contentImage.map((image) => image.blob),
        hastags: hastag,
      },
      isLiked: false,
      isReposted: false,
      likeCount: 0,
      replies: {
        count: 0,
        imageProfile: [],
      },
      updated_at: time,
      created_at: time,
    };
    // await axios.post('http://localhost:5000/contentDatas', data);
    await axios.post('http://localhost:5000/userThreds', data);
    navigate('/home', { replace: true });
  };

  const handleDeleteImage = (id: number) => {
    setContentImage(contentImage.filter((image) => image.id !== id));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <RxCross2
            size={22}
            onClick={() => navigate('/home', { replace: true })}
            className="cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <h1 className="font-bold text-[16px] sm:text-[18px]">New Thread</h1>
        </div>
        <button
          className={cn('font-bold text-[16px] sm:text-[18px] cursor-pointer', {
            'text-gray-400': !isFormValid,
          })}
          onClick={handleSendClick}
          disabled={!isFormValid}>
          Done
        </button>
      </div>
      <div className="flex flex-col">
        <div className="relative z-10 flex justify-between gap-3">
          <div className="relative w-max">
            <ModalProfilePicture imgSrc={user?.image || ''}>
              <img
                src={user?.image}
                alt={user?.username}
                className="rounded-full w-[50px] h-[50px] object-cover bg-gray-200"
              />
            </ModalProfilePicture>
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
            <InputMultiSelect
              datas={[]}
              placeholder="#"
              onChange={(e) => setHastag(e)}
            />
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
                        <ImageInputContent
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
  );
}

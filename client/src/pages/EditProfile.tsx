import Input from '@/components/atoms/Input';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageInputProfile from '@/components/atoms/ImageInputProfile';
import { FileWithPath } from 'file-selector';

type FormType = {
  imageProfile: string;
  name: string;
  username: string;
  bio: string;
  link: string;
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [isValidUrl, setIsValidUrl] = useState(false);

  const form = useForm<FormType>({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      imageProfile: '',
      name: '',
      username: '',
      bio: '',
      link: '',
    },
    validate: {
      name: (value) => {
        if (!/^[a-zA-Z ]{3,20}$/.test(value)) {
          return 'Invalid input. Use only letters with 3 - 20 characters.';
        }
        return null;
      },
      username: (value) => {
        if (!/^[a-z0-9 ]{3,10}$/.test(value)) {
          return 'Invalid input. Use only letters and number with 3 - 10 characters.';
        }
        return null;
      },
      bio: (value) => {
        if (!/^[a-z0-9/:#@\s]{0,50}$/.test(value)) {
          return 'Invalid input. No symbols allowed with 50 characters.';
        }
        return null;
      },
      link: (value) => {
        if (
          !/^((http[s]?|ftp):\/\/)?([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/.test(
            value
          )
        ) {
          return 'Invalid URL. Please enter a valid web address.';
        }
        setIsValidUrl(true);
        return null;
      },
    },
  });

  useEffect(() => {
    const getDataProfile = async () => {
      const res = await axios.get('http://localhost:5000/userProfile');
      form.setValues(res.data);
    };

    getDataProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProfile = async () => {
    await axios.patch('http://localhost:5000/userProfile', {
      imageProfile: form.values.imageProfile,
      name: form.values.name,
      username: form.values.username,
      bio: form.values.bio,
      link: form.values.link,
    });
    navigate('/profile');
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <RxCross2
            size={22}
            onClick={() => navigate('/profile')}
            className="cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <h1 className="font-bold text-[16px] sm:text-[18px]">Edit profile</h1>
        </div>
        <button
          className="font-bold text-[16px] sm:text-[18px] cursor-pointer"
          onClick={handleEditProfile}>
          Done
        </button>
      </div>

      <div className="border-2 border-gray-200 rounded-lg py-2 px-4">
        <div>
          <ImageInputProfile
            value={form.values.imageProfile}
            errorLabel={form.errors.imageProfile as string}
            onChange={(e) => {
              form.setFieldValue(
                'imageProfile',
                URL.createObjectURL(e as FileWithPath)
              );
            }}
          />
        </div>
        <Input
          id="name"
          label="Name"
          type="text"
          maxLength={20}
          value={form.values.name}
          errorLabel={form.errors.name as string}
          onChange={(e) => form.setFieldValue('name', e as string)}
        />
        <Input
          id="username"
          label="Username"
          type="text"
          maxLength={10}
          disabled={true}
          value={form.values.username}
          errorLabel={form.errors.username as string}
          onChange={(e) => form.setFieldValue('username', e as string)}
        />
        <Input
          id="bio"
          label="Bio"
          type="text"
          maxLength={50}
          value={form.values.bio}
          errorLabel={form.errors.bio as string}
          onChange={(e) => form.setFieldValue('bio', e as string)}
        />
        <Input
          id="link"
          label="Link"
          type="text"
          maxLength={100}
          value={form.values.link}
          errorLabel={form.errors.link as string}
          onChange={(e) => form.setFieldValue('link', e as string)}
          className={isValidUrl ? 'text-blue-400' : ''}
        />
      </div>
    </div>
  );
}

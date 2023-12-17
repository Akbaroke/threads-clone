import { useEffect, useState } from 'react';
import { MultiSelect } from '@mantine/core';

export type DataTags = {
  name: string;
  value: string;
  label: string;
};

type Props = {
  datas: DataTags[];
  placeholder: string;
  setHastag: (e: DataTags[]) => void;
};

function InputTags({ datas, placeholder, setHastag }: Props) {
  const [data, setData] = useState<DataTags[]>(datas);

  useEffect(() => {
    setHastag(data);
  }, [data]);

  return (
    <MultiSelect
      data={data}
      variant="unstyled"
      searchable
      creatable
      size="md"
      placeholder={placeholder}
      getCreateLabel={(query) => `#${query}`}
      onCreate={(query) => {
        const item = { value: query, label: `#${query}`, name: query };
        setData((current) => [...current, item]);
        return item;
      }}
    />
  );
}

export default InputTags;

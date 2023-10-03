import { useState } from 'react';
import { MultiSelect } from '@mantine/core';

type DataValue = {
  value: string;
  label: string;
};

type Props = {
  datas: DataValue[];
  placeholder: string;
  icon?: React.ReactNode;
  onChange?: (e: string[]) => void;
};

function InputMultiSelect({ datas, placeholder, icon, onChange }: Props) {
  const [data, setData] = useState<DataValue[]>(datas);

  return (
    <MultiSelect
      data={data}
      variant="unstyled"
      searchable
      creatable
      size="md"
      icon={icon}
      placeholder={placeholder}
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setData((current) => [...current, item]);
        return item;
      }}
      onChange={onChange}
    />
  );
}

export default InputMultiSelect;

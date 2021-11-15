import { InputHTMLAttributes, useCallback, useState } from 'react';

import { IconBaseProps } from 'react-icons';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { ContainerInput } from './styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export function InputIcon({
  name,
  icon: Icon,
  register,
  getValues,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!getValues(name));
  }, [getValues, name]);

  return (
    <>
      <ContainerInput isFocused={isFocused} isFilled={isFilled}>
        {Icon && <Icon size={20} />}

        <input
          {...register(name)}
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
        />
      </ContainerInput>
    </>
  );
}

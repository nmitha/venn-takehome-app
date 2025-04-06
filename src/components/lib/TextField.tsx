import { useId } from 'react';
import { Input, InputContainer, Label, ErrorText } from 'src/components/lib';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
  hasError?: boolean;
  isRequired?: boolean;
};

const TextField = ({
  label,
  errorMessage,
  isRequired = false,
  hasError = false,
  ...htmlInputProps
}: TextFieldProps) => {
  const id = useId();

  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-invalid={hasError} aria-required={isRequired} {...htmlInputProps} />
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </InputContainer>
  );
};

export default TextField;

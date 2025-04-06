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
  const errorId = useId();

  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-required={isRequired}
        {...htmlInputProps}
      />
      {hasError && <ErrorText id={errorId}>{errorMessage}</ErrorText>}
    </InputContainer>
  );
};

export default TextField;

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import {
  OnboardingFormDataSchema,
  type OnboardingFormData,
  postProfileDetails,
} from 'src/apiClients/onboardingApiClient';
import {
  PrimaryButton,
  InputGroup,
  InputContainer,
  Label,
  Input,
  ErrorText,
} from 'src/components/lib';

const OnboardingForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({
    resolver: arktypeResolver(OnboardingFormDataSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const performSubmit = useCallback(async (data: OnboardingFormData) => {
    const result = await postProfileDetails(data);
    setIsSuccess(result.isSuccess);
    setServerErrorMessage(result.errorMessage);
  }, []);

  if (isSuccess) {
    // TODO: Get designs for next steps
    return <p>Got it, your profile details have been saved.</p>;
  }

  return (
    <form onSubmit={handleSubmit(performSubmit)}>
      {serverErrorMessage && (
        <p className="text-red-500 mb-4">
          We couldn't save your profile data. Problems found:
          <br />
          {serverErrorMessage}
        </p>
      )}

      <InputGroup>
        <InputContainer>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="First Name" {...register('firstName')} />
          {errors.firstName && <ErrorText>First Name is required</ErrorText>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Last Name" {...register('lastName')} />
          {errors.lastName && <ErrorText>Last Name is required</ErrorText>}
        </InputContainer>
      </InputGroup>

      <InputContainer>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="Phone Number" {...register('phone')} />
        {errors.phone && (
          <ErrorText>
            You must enter a valid Canadian phone number that is formatted like this example:
            +14161234567
          </ErrorText>
        )}
      </InputContainer>

      <InputContainer>
        <Label htmlFor="corporationNumber">Corporation Number</Label>
        <Input
          id="corporationNumber"
          placeholder="Corporation Number"
          {...register('corporationNumber')}
        />
        {errors.corporationNumber && <ErrorText>Invalid Corporation Number</ErrorText>}
      </InputContainer>

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit →'}
      </PrimaryButton>
    </form>
  );
};

export default OnboardingForm;

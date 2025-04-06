import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import {
  OnboardingFormDataSchema,
  type OnboardingFormData,
  postProfileDetails,
} from 'src/apiClients/vault/onboardingApiClient';
import { PrimaryButton, InputGroup, FormErrorText } from 'src/components/lib';
import { startViewTransition } from 'src/util/viewTransitionUtils';
import TextField from 'src/components/lib/TextField';

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
    setServerErrorMessage(null);
    const result = await postProfileDetails(data);

    startViewTransition(() => {
      setIsSuccess(result.isSuccess);
      setServerErrorMessage(result.errorMessage);
    });
  }, []);

  if (isSuccess) {
    // TODO: Get designs for next steps
    return <p>Got it, your profile details have been saved.</p>;
  }

  return (
    <form onSubmit={handleSubmit(performSubmit)}>
      {serverErrorMessage && (
        <FormErrorText>
          <p>We couldn't save your profile data. Problems found:</p>
          <p>{serverErrorMessage}</p>
        </FormErrorText>
      )}

      <InputGroup>
        <TextField
          label="First Name"
          isRequired
          hasError={!!errors.firstName}
          errorMessage="First Name is required"
          {...register('firstName')}
        />

        <TextField
          label="Last Name"
          isRequired
          hasError={!!errors.lastName}
          errorMessage="Last Name is required"
          {...register('lastName')}
        />
      </InputGroup>

      <TextField
        label="Phone Number"
        isRequired
        hasError={!!errors.phone}
        errorMessage="You must enter a valid Canadian phone number that is formatted like this example: +14161234567"
        {...register('phone')}
      />

      <TextField
        label="Corporation Number"
        isRequired
        hasError={!!errors.corporationNumber}
        errorMessage="Invalid Corporation Number"
        inputMode="numeric"
        {...register('corporationNumber')}
      />

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit →'}
      </PrimaryButton>
    </form>
  );
};

export default OnboardingForm;

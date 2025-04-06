import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { arktypeResolver } from '@hookform/resolvers/arktype';
import {
  OnboardingFormDataSchema,
  type OnboardingFormData,
  postProfileDetails,
} from '../apiClients/onboardingApiClient';

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

  // FIXME: Re-enable this before submitting to Venn!
  if (false && isSuccess) {
    // TODO: Get designs for next steps
    return <p>Got it, your profile details have been saved.</p>;
  }

  return (
    <form onSubmit={handleSubmit(performSubmit)}>
      {serverErrorMessage && (
        <p>
          We couldn't save your profile data. Problems found:
          <br />
          {serverErrorMessage}
        </p>
      )}

      <input placeholder="First Name" {...register('firstName')} />
      {errors.firstName && <span>First Name is required</span>}

      <input placeholder="Last Name" {...register('lastName')} />
      {errors.lastName && <span>Last Name is required</span>}

      <input placeholder="Phone Number" {...register('phone')} />
      {errors.phone && (
        <span>
          You must enter a valid Canadian phone number that is formatted like this example:
          +14161234567
        </span>
      )}

      <input placeholder="Corporation Number" {...register('corporationNumber')} />
      {errors.corporationNumber && <span>Invalid Corporation Number</span>}

      <input
        type="submit"
        disabled={isSubmitting}
        value={isSubmitting ? 'Submitting...' : 'Submit →'}
      />
    </form>
  );
};

export default OnboardingForm;

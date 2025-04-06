import { StepIndicator, FormTitle, Card, FormContainer } from '../lib';
import OnboardingForm from './OnboardingForm';

const OnboardingFormStep = () => {
  return (
    <>
      <FormContainer>
        <StepIndicator>Step 1 of 5</StepIndicator>
        <Card>
          <FormTitle>Onboarding Form</FormTitle>
          <OnboardingForm />
        </Card>
      </FormContainer>
    </>
  );
};

export default OnboardingFormStep;

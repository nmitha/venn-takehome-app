import { StepIndicator, H2, Card, StepContainer } from 'src/components/lib';
import OnboardingForm from 'src/components/app/OnboardingForm';

const OnboardingFormStep = () => {
  return (
    <StepContainer>
      <StepIndicator>Step 1 of 5</StepIndicator>
      <Card>
        {/* We start at heading level <h2> here because we'll be implementing a page header
              with an <h1> website title */}
        <H2>Onboarding Form</H2>
        <OnboardingForm />
      </Card>
    </StepContainer>
  );
};

export default OnboardingFormStep;

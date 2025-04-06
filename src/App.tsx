import * as React from 'react';
import 'src/App.css';
import OnboardingFormStep from 'src/components/app/OnboardingFormStep';
import { ErrorBoundary } from 'react-error-boundary';

const handleError = (error: Error, info: React.ErrorInfo) => {
  // TODO: Implement proper error logging (e.g. pino) and error reporting (e.g. Sentry)
  console.error('Error caught in App ErrorBoundary', error, info);
};

function App() {
  return (
    <main>
      <ErrorBoundary
        onError={handleError}
        fallback={<p>Something went wrong. Please try again.</p>}
      >
        <OnboardingFormStep />
      </ErrorBoundary>
    </main>
  );
}

export default App;

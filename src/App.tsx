import * as React from 'react';
import './App.css';
import OnboardingFormStep from './components/app/OnboardingFormStep';
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
        {/* When we ship we'll have a header with the main website title as <h1>, so the heading
            level starts at <h2> here */}
        <h2>Step 1 of 5</h2>
        <OnboardingFormStep />
      </ErrorBoundary>
    </main>
  );
}

export default App;

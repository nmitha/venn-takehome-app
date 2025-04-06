import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'src/index.css';
import 'src/components/lib/animations.css';
import OnboardingFormStep from 'src/components/app/OnboardingFormStep';
import { ErrorBoundary } from 'react-error-boundary';

const handleError = (error: Error, info: React.ErrorInfo) => {
  // TODO: Implement proper error logging (e.g. pino) and error reporting (e.g. Sentry)
  console.error('Error caught in App ErrorBoundary', error, info);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Website header and top nav menu will go here */}
    <main>
      <ErrorBoundary
        onError={handleError}
        fallback={<p>Something went wrong. Please refresh the page andtry again.</p>}
      >
        <OnboardingFormStep />
      </ErrorBoundary>
    </main>
  </StrictMode>,
);

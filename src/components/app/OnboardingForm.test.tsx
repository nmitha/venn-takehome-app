import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import OnboardingForm from 'src/components/app/OnboardingForm';
import { server } from 'src/mocks/server';
import { ONBOARDING_API_BASE_URL } from 'src/apiClients/onboardingApiClient';

describe('OnboardingForm', () => {
  beforeEach(() => {
    // Reset to default success handler before each test
    server.resetHandlers(
      http.post(`${ONBOARDING_API_BASE_URL}/profile-details`, () => {
        return HttpResponse.json({}, { status: 200 });
      }),
    );
  });

  it('renders the form correctly', () => {
    render(<OnboardingForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/corporation number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates first name is required', async () => {
    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Focus and blur the first name field without entering text
    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.click(firstNameInput);
    await user.tab(); // Tab to next field to trigger blur

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });

  it('validates last name is required', async () => {
    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Focus and blur the last name field without entering text
    const lastNameInput = screen.getByLabelText(/last name/i);
    await user.click(lastNameInput);
    await user.tab(); // Tab to next field to trigger blur

    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
  });

  it('validates phone number format', async () => {
    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Enter invalid phone number
    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.click(phoneInput);
    await user.keyboard('123456789');
    await user.tab(); // Tab to next field to trigger validation

    expect(screen.getByText(/valid canadian phone number/i)).toBeInTheDocument();

    // Clear and enter valid phone number
    await user.clear(phoneInput);
    await user.keyboard('+14161234567');
    await user.tab();

    expect(screen.queryByText(/valid canadian phone number/i)).not.toBeInTheDocument();
  });

  it('validates corporation number format', async () => {
    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Enter invalid corporation number (too short)
    const corpInput = screen.getByLabelText(/corporation number/i);
    await user.click(corpInput);
    await user.keyboard('12345');
    await user.tab();

    expect(screen.getByText(/invalid corporation number/i)).toBeInTheDocument();

    // Clear and enter valid corporation number (9 digits, could be leading 0)
    await user.clear(corpInput);
    await user.keyboard('012345678');
    await user.tab();

    expect(screen.queryByText(/invalid corporation number/i)).not.toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Fill in valid data
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/phone number/i), '+14161234567');
    await user.type(screen.getByLabelText(/corporation number/i), '123456789');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Check success message appears using the exact text from the component
    await waitFor(() => {
      expect(screen.getByText('Got it, your profile details have been saved.')).toBeInTheDocument();
    });
  });

  it('displays server error when API returns an error', async () => {
    // Mock the API to return an error
    server.use(
      http.post(`${ONBOARDING_API_BASE_URL}/profile-details`, () => {
        return HttpResponse.json(
          { message: 'This corporation number is already registered' },
          { status: 400 },
        );
      }),
    );

    render(<OnboardingForm />);
    const user = userEvent.setup();

    // Fill in form data
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/phone number/i), '+14161234567');
    await user.type(screen.getByLabelText(/corporation number/i), '123456789');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Check error message appears
    await waitFor(() => {
      expect(
        screen.getByText("We couldn't save your profile data. Problems found:"),
      ).toBeInTheDocument();
      expect(screen.getByText('This corporation number is already registered')).toBeInTheDocument();
    });

    // Form should still be visible (not navigated away)
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });
});

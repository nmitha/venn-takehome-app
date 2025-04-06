import { twc } from 'react-twc';

export * from 'src/components/lib/Buttons';

// Normally the rest of the components wouldn't all be in 1 file like this, but for a take home challenge it's OK
// TODO: Use Prettier to auto-sort Tailwind classes

export const FormContainer = twc.div`
  min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4
`;

export const StepIndicator = twc.div`
  text-center font-normal text-gray-800 mb-8
`;

export const Card = twc.div`
  bg-white rounded-xl shadow-sm p-8 w-full max-w-md
`;

export const FormTitle = twc.h2`
  text-2xl font-medium text-center mb-6 text-gray-900
`;

export const InputGroup = twc.fieldset`
  flex gap-4
`;

export const InputContainer = twc.div`
  flex flex-col w-full mb-5
`;

export const Label = twc.label`
  font-bold text-sm text-gray-700 mb-1
`;

export const Input = twc.input`
  w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base
`;

export const ErrorText = twc.span`
  text-red-500 text-xs mt-1
`;

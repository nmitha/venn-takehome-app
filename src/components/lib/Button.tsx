import { twc } from 'react-twc';

export const FormContainer = twc.div`
  min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4
`;

export const StepIndicator = twc.div`
  text-center font-medium text-gray-800 mb-8
`;

export const Card = twc.div`
  bg-white rounded-xl shadow-sm p-8 w-full max-w-md
`;

export const FormTitle = twc.h2`
  text-2xl font-medium text-center mb-6 text-gray-800
`;

export const InputGroup = twc.div`
  flex gap-4 mb-4
`;

export const InputContainer = twc.div`
  flex flex-col w-full mb-4
`;

export const Label = twc.label`
  font-medium text-gray-700 mb-1
`;

export const Input = twc.input`
  w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
`;

export const ErrorText = twc.span`
  text-red-500 text-sm mt-1
`;

export const Button = twc.button`
  px-4 py-2 

  text-white font-semibold 
  rounded-md shadow-sm 
  transition-colors duration-200
`;

export const PrimaryButton = twc(Button)`
  bg-black hover:bg-black/90
  w-full py-4 mt-2 rounded-md flex items-center justify-center
`;

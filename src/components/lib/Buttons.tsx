import { twc } from 'react-twc';

export const Button = twc.button`
  px-4 py-2 
  text-white font-semibold 
  rounded-md shadow-sm 
  transition-colors duration-200
`;

export const PrimaryButton = twc(Button)`
  bg-black hover:bg-black/75
  w-full py-3 mt-4 rounded-md flex items-center justify-center
  text-sm font-medium
`;

import { createContext, useCallback, useContext, useState } from 'react';
import { PreAuth } from '../App';

type FormState = {
  [key: string]: any;
};

interface MultiFormContextProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  onSubmit: (newUser: PreAuth | undefined) => void;
}

const MultiFormContext = createContext<MultiFormContextProps | undefined>(undefined);

interface MultiFormProviderProps extends React.PropsWithChildren {
  onSubmit: (newUser: PreAuth | undefined) => void;
}

export const MultiFormProvider = ({ onSubmit, children }: MultiFormProviderProps) => {
  const [formData, setFormData] = useState<FormState>({});
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep(currentStep + 1)
  }, [currentStep]);
  const prevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <MultiFormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep, nextStep, prevStep, onSubmit }}>
      {children}
    </MultiFormContext.Provider>
  );
};

export const useFormContext = () => {
  if (MultiFormContext === null)
    throw new Error('useFormContext must be used within a context provider');

  return useContext(MultiFormContext);
};

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type FormState = {
  [key: string]: any;
};

interface FormErrors extends FormState {}

interface MultiFormContextProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  submit: (formObj: any) => void;
  setSubmit: React.Dispatch<React.SetStateAction<(formObj: any) => any>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
}

const MultiFormContext = createContext<MultiFormContextProps | undefined>(undefined);

interface MultiFormProviderProps extends React.PropsWithChildren {
  onSubmit: (formObj: any) => void;
}

export const MultiFormProvider = ({ onSubmit, children }: MultiFormProviderProps) => {
  const [formData, setFormData] = useState<FormState>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [ submit, setSubmit ] = useState<(formObj: any) => void>(() => onSubmit);

  const nextStep = useCallback(() => {
    setCurrentStep(currentStep + 1)
  }, [currentStep]);
  const prevStep = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <MultiFormContext.Provider value={{ formData, setFormData, currentStep, setCurrentStep, nextStep, prevStep, errors, setErrors, setSubmit, submit }}>
      {children}
    </MultiFormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(MultiFormContext);
};

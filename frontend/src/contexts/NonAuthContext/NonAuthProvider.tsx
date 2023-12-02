import { NonAuthContext } from "./NonAuthContext";

interface NonAuthProviderProps extends React.PropsWithChildren {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const NonAuthProvider = ({
  setToken,
  children,
}: NonAuthProviderProps) => {
  // Provide the user and authenticate function to the context
  return (
    <NonAuthContext.Provider value={{ setToken }}>
      {children}
    </NonAuthContext.Provider>
  );
};

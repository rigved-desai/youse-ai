import { createContext, useContext, useState, PropsWithChildren } from 'react';

type UserContextProps = {
  user?: string;
  updateUserContext: (username: string | undefined) => void;
};

const userContext = createContext<UserContextProps | undefined>(undefined);

export function UserContextProvider({ children }: PropsWithChildren) {

  const [user, setUsername] = useState<string | undefined>(undefined);

  const updateUserContext = (updatedUser: string | undefined) => {
    setUsername(updatedUser);
  };

  console.log("Context user: ", user);
  return (
    <userContext.Provider value={{ user, updateUserContext }}>
      {children}
    </userContext.Provider>
  )
}

export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw Error('User not found!');
  }
  return context;
}

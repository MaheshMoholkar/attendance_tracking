// import { useValidateToken } from "@/services/queries";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

type AppContextType = {
  isLoggedIn: boolean | undefined;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType
);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const querClient = useQueryClient();
  //   const { data, isLoading, error } = useValidateToken();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

  //   useEffect(() => {
  //     if (!isLoading && !error) {
  //       setLoggedIn(data?.verified);
  //     }
  //   }, [data, isLoading, error]);

  const handleSetLoggedIn = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
    querClient.invalidateQueries({ queryKey: ["validateToken"] });
  };

  const contextValue: AppContextType = {
    isLoggedIn: loggedIn,
    setLoggedIn: handleSetLoggedIn,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

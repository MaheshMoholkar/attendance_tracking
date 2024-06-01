// import { useValidateToken } from "@/services/queries";
import { useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";

type AppContextType = {
  isLoggedIn: boolean | undefined;
  setLoggedIn: (loggedIn: boolean) => void;
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
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
  const [showLoader, setShowLoader] = useState<boolean>(false);

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
    showLoader,
    setShowLoader,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

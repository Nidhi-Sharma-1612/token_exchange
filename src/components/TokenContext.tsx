import React, { useState } from "react";

interface TokenContextInterface {
  web3: any | undefined;
  setWeb3: React.Dispatch<React.SetStateAction<any | undefined>>;
  token: any | undefined;
  setToken: React.Dispatch<React.SetStateAction<any | undefined>>;
  ethBalance: string;
  setEthBalance: React.Dispatch<React.SetStateAction<string>>;
  tokenBalance: string;
  setTokenBalance: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContext = React.createContext({} as TokenContextInterface);

const TokenContextProvider: React.FC = ({ children }: any) => {
  const [web3, setWeb3] = useState<any | undefined>();
  const [token, setToken] = React.useState<any | undefined>({});
  const [ethBalance, setEthBalance] = React.useState<string>("");
  const [tokenBalance, setTokenBalance] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  return (
    <TokenContext.Provider
      value={{
        web3,
        setWeb3,
        token,
        setToken,
        ethBalance,
        setEthBalance,
        tokenBalance,
        setTokenBalance,

        address,
        setAddress,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;

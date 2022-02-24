import { Logo, Nav, Wallet } from "./styles";
import Web3 from "web3";
import React, { useContext, useEffect } from "react";
import addBSCNetwork from "../../blockchain/addBSCNetwork";
import Contract from "../../blockchain/getContractInstance";
import { TokenObj } from "../../blockchain/abis/Token";
import { TokenContext } from "../TokenContext";

const Navbar = () => {
  const [isConnected, setConnected] = React.useState<Boolean>(false);
  const {
    tokenBalance,
    setTokenBalance,
    web3,
    setWeb3,
    ethBalance,
    setEthBalance,
    setToken,

    address,
    setAddress,
  } = useContext(TokenContext);

  const handleClick = async () => {
    //@ts-ignore

    const { ethereum, alert } = window;
    let accounts: any;

    if (ethereum && ethereum.isMetaMask) {
      console.log("Connecting to Wallet!!!");
      const web3 = new Web3(ethereum);
      accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      addBSCNetwork(ethereum);
      setWeb3(web3);
      setConnected(true);
      setAddress(accounts[0]);
      console.log("Accounts", accounts);
      let ethBalance = await web3.eth.getBalance(accounts[0]);
      setEthBalance(ethBalance);
      console.log(+ethBalance);

      //Load Token

      const token = Contract(TokenObj.abi, TokenObj.address, web3);
      setToken(token);
      console.log("@@@@@@@@", address);

      let tokenBal;
      try {
        tokenBal = await token.methods.balanceOf(accounts[0]).call();
        console.log("TokenBalance", tokenBal.toString());
        setTokenBalance(tokenBal);
      } catch (error: any) {
        console.log(error.message);
      }

      //Load ethSwap

      // @ts-ignore
      ethereum.on("accountsChanged", function (accounts) {
        accounts = accounts;
        console.log("string", accounts.length);
        if (accounts.length === 0) {
          setConnected(false);
        } else {
          setAddress(accounts[0]);
        }
      });
    } else {
      alert("Please Install Metamask");
    }
  };

  useEffect(() => {
    handleClick();
  }, []);
  return (
    <Nav>
      <Logo>Token Exchange</Logo>
      <Wallet onClick={handleClick}>
        {isConnected
          ? address.slice(0, 8) + "..." + address.slice(-3)
          : "Connect to Metamask"}
      </Wallet>
    </Nav>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { TokenObj } from "../../blockchain/abis/Token";
import { TokenSwapObj } from "../../blockchain/abis/TokenSwap";
import Contract from "../../blockchain/getContractInstance";
import { TokenContext } from "../TokenContext";
import { Input, Main, IB, Button } from "./styles";

const Sell = () => {
  const [tokenAmount, setTokenAmount] = React.useState<Number>(0);
  const {
    tokenBalance,
    ethBalance,
    web3,
    address,
    setEthBalance,
    setTokenBalance,
  } = useContext(TokenContext);
  const [loading, setLoading] = React.useState<Boolean>(false);

  function handleChange(event: any) {
    event.preventDefault();
    let tokenAmt = event.target.value;
    setTokenAmount(tokenAmt);
  }

  function approveToken(tokenAmount: any) {
    Contract(TokenObj.abi, TokenObj.address, web3)
      .methods.approve(TokenSwapObj.address, tokenAmount)
      .send({ from: address })
      .then(() => {
        console.log("Approve");
        setLoading(false);
        sellTokens(tokenAmount);
      })
      .catch((error: any) => {
        console.log(error.message);
        setLoading(false);
      });
  }

  function sellTokens(tokenAmount: any) {
    Contract(TokenSwapObj.abi, TokenSwapObj.address, web3)
      .methods.sellTokens(tokenAmount)
      .send({ from: address })
      .then(async () => {
        console.log("sellToken");
        let updateEthBal = await web3.eth.getBalance(address);
        setEthBalance(updateEthBal);
        console.log("EthBalance", web3.eth.getBalance(address));

        setTokenBalance(
          await Contract(TokenObj.abi, TokenObj.address, web3)
            .methods.balanceOf(address)
            .call()
        );
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  }

  return (
    <Main>
      <Input>
        <IB>
          <div>
            <b>Input</b>
          </div>
          <div>
            {tokenBalance
              ? `Balance : ${web3.utils
                  .fromWei(tokenBalance, "Ether")
                  .slice(0, 10)}`
              : `Balance : ${0}`}
          </div>
        </IB>
        <div>
          <input
            name={"data"}
            type={"text"}
            onChange={handleChange}
            disabled={false}
            style={{
              width: "98%",
              marginBottom: "2em",
              cursor: "pointer",
              border: "1px solid black",
            }}
          ></input>
        </div>
        <br />
        <IB>
          <div>
            <b>Output</b>
          </div>
          <div>
            {ethBalance
              ? `Balance : ${web3.utils
                  .fromWei(ethBalance, "Ether")
                  .slice(0, 10)}`
              : `Balance : ${0}`}
          </div>
        </IB>
        <div>
          <input
            type={"text"}
            value={+tokenAmount / 100}
            disabled={true}
            style={{
              width: "98%",
              marginBottom: ".5em",

              border: "1px solid black",
            }}
          ></input>

          <label></label>
        </div>
        <IB>
          <div>Exchange Rate</div>
          <div>1 dApp = 0.01 ETH</div>
        </IB>

        <div>
          <Button
            onClick={(event) => {
              event.preventDefault();
              console.log("Swap...");
              setLoading(true);
              approveToken(web3.utils.toWei(tokenAmount, "ether"));
            }}
          >
            {loading ? "Loading..." : "SWAP"}
          </Button>
        </div>
      </Input>
    </Main>
  );
};

export default Sell;

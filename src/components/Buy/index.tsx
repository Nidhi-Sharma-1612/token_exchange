import React, { useContext } from "react";
import { TokenObj } from "../../blockchain/abis/Token";
import { TokenSwapObj } from "../../blockchain/abis/TokenSwap";
import Contract from "../../blockchain/getContractInstance";
import { TokenContext } from "../TokenContext";
import { Input, Main, IB, Button } from "./styles";

const Buy = () => {
  const [ethAmount, setEthAmount] = React.useState<Number>(0);
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
    // console.log("Input: ", event.target.value);
    let ethAmount = event.target.value;
    setEthAmount(ethAmount);

    // console.log("Output: ", ethAmount);
  }
  function buyTokens(ethAmount: Number) {
    const ethSwap = Contract(TokenSwapObj.abi, TokenSwapObj.address, web3);
    ethSwap.methods
      .buyTokens()
      .send({
        value: web3.utils.toWei(ethAmount.toString(), "ether"),
        from: address,
      })
      .then(async () => {
        setLoading(false);
        console.log("Success");
        let updateEthBal = await web3.eth.getBalance(address);
        setEthBalance(updateEthBal);
        console.log("EthBalance", web3.eth.getBalance(address));

        setTokenBalance(
          await Contract(TokenObj.abi, TokenObj.address, web3)
            .methods.balanceOf(address)
            .call()
        );
        console.log(
          "TokenBalance",
          Contract(TokenObj.abi, TokenObj.address, web3)
            .methods.balanceOf(address)
            .call()
            .toString()
        );
      })
      .catch((err: any) => {
        console.log(err.message);
        setLoading(false);
      });

    console.log(ethSwap.methods);
  }

  return (
    <Main>
      <Input>
        <IB>
          <div>
            <b>Input</b>
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
            name={"data"}
            type={"text"}
            onChange={handleChange}
            onKeyUp={handleChange}
            style={{
              width: "98%",
              marginBottom: "2em",
              cursor: "pointer",
              border: "1px solid black",
              outline: "none",
            }}
          ></input>
          <label></label>
        </div>
        <br />
        <IB>
          <div>
            <b>Output</b>
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
            type={"text"}
            value={+ethAmount * 100}
            disabled={true}
            style={{
              width: "98%",
              marginBottom: ".5em",
              outline: "none",
              border: "1px solid black",
            }}
          ></input>
        </div>
        <IB>
          <div>Exchange Rate</div>
          <div>1 ETH = 100 dApp</div>
        </IB>

        <div>
          <Button
            onClick={(event) => {
              event.preventDefault();
              console.log("Swap...");
              setLoading(true);
              buyTokens(ethAmount);
            }}
          >
            {loading ? "Loading..." : "SWAP"}
          </Button>
        </div>
      </Input>
    </Main>
  );
};

export default Buy;

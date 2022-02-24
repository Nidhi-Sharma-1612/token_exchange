import React from "react";
import Buy from "../Buy";
import Sell from "../Sell";
import { Buttons, Wrapper, BuySellBtn } from "./styles";

const Home = () => {
  const [isSell, setSell] = React.useState<Boolean>(false);
  return (
    <Wrapper>
      <Buttons>
        <BuySellBtn
          autoFocus
          onClick={() => {
            console.log("BuyBtn");
            setSell(false);
          }}
        >
          Buy
        </BuySellBtn>
        <BuySellBtn
          onClick={() => {
            console.log("SellBtn");
            setSell(true);
          }}
        >
          Sell
        </BuySellBtn>
      </Buttons>

      {isSell ? <Sell /> : <Buy />}
      {/* <Buy /> */}
      {/* <Sell /> */}
    </Wrapper>
  );
};

export default Home;

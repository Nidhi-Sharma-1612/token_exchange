import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  padding: 1em;
  width: 30%;
`;

export const Input = styled.div`
  width: 100%;
`;
export const IB = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5em;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 1.5em;
  background-color: #00b4d8;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  padding: 0.5em;
  border: none;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 30%;
  margin-bottom: 1em;
`;

export const BuySellBtn = styled(Button)`
  width: 20%;
  outline: none;
  background-color: gray;
  opacity: 0.5;
  &:focus {
    opacity: 1;
  }
`;
// background: ${props => props.primary ? "gra" : "white"};

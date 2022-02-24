import styled from "styled-components";

export const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: black;
  padding: 1em;
  position: fixed;
`;

export const Logo = styled.div`
  width: 20%;
  margin-right: 2em;
  color: yellow;
  font-weight: 700;
`;

export const Wallet = styled.button`
  width: 10%;
  padding: 0.3em;
  border-radius: 12px;
  border: none;
  font-weight: 500;
  color: blue;
  margin-right: 2em;
  cursor: pointer;
`;

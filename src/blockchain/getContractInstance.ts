const Contract = (abi: any, address: any, web3: any) => {
  //@ts-ignore
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

export default Contract;

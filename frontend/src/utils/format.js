import { ethers } from "ethers";

export const shortenAddress = (address = "") => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEth = (value) => {
  if (value === undefined || value === null) return "0";
  return Number(ethers.formatEther(value)).toFixed(4);
};

import { BLOCKCHAIN_PRIORITIES } from "./constant";

// Issue #8: Function re-creation and Issue #5: type `any`
export const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] || -99;
};

import React from "react";

// Assume BoxProps is a common component props
export interface BoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  // more props
}

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Issue #1: Add more `blockchain: string`
}

export interface Props extends BoxProps {}

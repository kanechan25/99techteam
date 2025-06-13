import React, { useMemo } from "react";
import { Props } from "./types";
import { getPriority } from "./helper";

// @ts-ignore
import { useWalletBalances, usePrices } from "./hooks"; // Assume these are defined in a separate file
// @ts-ignore
import { WalletRow } from "./components"; // Assume this is defined in a separate file
// @ts-ignore
import classes from "./styles.module.css"; // Assume this is defined in a separate file

export const WalletPage: React.FC<Props> = (props: Props) => {
  // Issue #13: remove 'children'
  const { ...rest } = props;
  const balances = useWalletBalances(); // Assume this is a function that returns WalletBalance[]
  const prices = usePrices(); // Assume this is a function that returns Record<string, number>

  // Issue #6, #7: Combine all logic into a single useMemo
  const walletRows = useMemo(() => {
    return (
      balances
        // Issue #2: remove `lhsPriority` Undefined variable and Issue #3: Correct filter logic
        .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        // Issue #11: Sort logic
        .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
        .map((balance) => {
          // Issue #4: Handle NaN
          const usdValue = (prices[balance.currency] || 0) * balance.amount;

          return (
            <WalletRow
              className={classes.row}
              // Issue #9: Use stable key
              key={balance.currency}
              amount={balance.amount}
              usdValue={usdValue}
              // Issue #12: Correct format
              formattedAmount={balance.amount.toFixed(2)}
            />
          );
        })
    );
  }, [balances, prices]);

  return <div {...rest}>{walletRows}</div>;
};

import React from "react";
import {Alert} from "@mui/material";
import {TransactionsTable} from "../../../components/TransactionsTable";
import Error from "../Error";
import {useGetAccountTransactions} from "../../../api/hooks/useGetAccountTransactions";

type TransactionTabProps = {
  address: string;
};

export default function TransactionTab({address}: TransactionTabProps) {
  const {isLoading, data, error} = useGetAccountTransactions(address);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <Error address={address} error={error} />;
  }

  if (!data) {
    return (
      <Alert severity="error">
        {`Got an empty response fetching Account Transactions with address ${address}.`}
        <br />
        Try again later.
      </Alert>
    );
  }

  return (
    <TransactionsTable
      transactions={data}
      columns={["status", "timestamp", "version", "hash", "gas"]}
    />
  );
}

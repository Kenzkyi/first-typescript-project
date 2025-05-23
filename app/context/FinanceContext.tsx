"use client";
import React, { createContext, useContext, useState } from "react";
import {
  allBudgets,
  allPots,
  colorDropArray,
  colorDropPotArray,
} from "../asset/datas";
import { contextValue, oneBudget, oneColor, onePot } from "../components/model";

export const myContext = createContext<contextValue | null>(null);

export const useFinanceContext = () => useContext(myContext);

const FinanceContext = ({ children }: { children: React.ReactNode }) => {
  const [openAddBudget, setOpenAddBudget] = useState<boolean>(false);
  const [openEditBudget, setOpenEditBudget] = useState<boolean>(false);
  const [openDeleteBudget, setOpenDeleteBudget] = useState<boolean>(false);
  const [openAddPot, setOpenAddPot] = useState<boolean>(false);
  const [openEditPot, setOpenEditPot] = useState<boolean>(false);
  const [openDeletePot, setOpenDeletePot] = useState<boolean>(false);
  const [openAddMoney, setOpenAddMoney] = useState<boolean>(false);
  const [openWithdrawMoney, setOpenWithdrawMoney] = useState<boolean>(false);
  const [singleEditingBudget, setSingleEditingBudget] = useState<object>({});
  const [singleDeletingBudget, setSingleDeleteBudget] = useState<object>({});
  const [singleEditingPot, setSingleEditingPot] = useState<object>({});
  const [singleDeletingPot, setSingleDeletePot] = useState<object>({});
  const [singleAddMoneyDetails, setSingleAddMoneyDetails] = useState<object>(
    {}
  );
  const [singleWithdrawMoneyDetails, setSingleWithdrawMoneyDetails] =
    useState<object>({});
  const [allAvailableBudget, setAllAvailableBudget] =
    useState<oneBudget[]>(allBudgets);
  const [allAvailablePots, setAllAvailablePots] = useState<onePot[]>(allPots);
  const [allAvailableColors, setAllAvailableColors] =
    useState<oneColor[]>(colorDropArray);
  const [allAvailablePotColors, setAllAvailablePotColors] =
    useState<oneColor[]>(colorDropPotArray);

  const defaultValue = {
    openAddBudget,
    setOpenAddBudget,
    allAvailableBudget,
    setAllAvailableBudget,
    allAvailableColors,
    setAllAvailableColors,
    openEditBudget,
    setOpenEditBudget,
    singleEditingBudget,
    setSingleEditingBudget,
    openDeleteBudget,
    setOpenDeleteBudget,
    singleDeletingBudget,
    setSingleDeleteBudget,
    openAddPot,
    setOpenAddPot,
    allAvailablePotColors,
    setAllAvailablePotColors,
    allAvailablePots,
    setAllAvailablePots,
    openEditPot,
    setOpenEditPot,
    singleEditingPot,
    setSingleEditingPot,
    openDeletePot,
    setOpenDeletePot,
    singleDeletingPot,
    setSingleDeletePot,
    openAddMoney,
    setOpenAddMoney,
    singleAddMoneyDetails,
    setSingleAddMoneyDetails,
    openWithdrawMoney,
    setOpenWithdrawMoney,
    singleWithdrawMoneyDetails,
    setSingleWithdrawMoneyDetails,
  };

  return (
    <myContext.Provider value={defaultValue}>{children}</myContext.Provider>
  );
};

export default FinanceContext;

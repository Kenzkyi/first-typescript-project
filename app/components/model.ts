import type { StaticImageData } from "next/image";
export interface oneBudget {
  category: string;
  maximum: number;
  theme: string;
  spent: number;
  remaining: number;
  id: number;
}

export interface onePot {
  name: string;
  target: number;
  total: number;
  theme: string;
  id: number;
}

export interface oneBill {
  avatar: StaticImageData;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  dueDate: string;
}

export interface oneColor {
  name: string;
  hex: string;
  alreadyUsed: boolean;
}

export interface contextValue {
  openAddBudget: boolean;
  setOpenAddBudget: React.Dispatch<React.SetStateAction<boolean>>;
  allAvailableBudget: oneBudget[];
  setAllAvailableBudget: React.Dispatch<React.SetStateAction<oneBudget[]>>;
  allAvailableColors: oneColor[];
  setAllAvailableColors: React.Dispatch<React.SetStateAction<oneColor[]>>;
  openEditBudget: boolean;
  setOpenEditBudget: React.Dispatch<React.SetStateAction<boolean>>;
  singleEditingBudget: oneBudget | null;
  setSingleEditingBudget: React.Dispatch<
    React.SetStateAction<oneBudget | null>
  >;
  openDeleteBudget: boolean;
  setOpenDeleteBudget: React.Dispatch<React.SetStateAction<boolean>>;
  singleDeletingBudget: oneBudget | null;
  setSingleDeleteBudget: React.Dispatch<React.SetStateAction<oneBudget | null>>;
  openAddPot: boolean;
  setOpenAddPot: React.Dispatch<React.SetStateAction<boolean>>;
  allAvailablePotColors: oneColor[];
  setAllAvailablePotColors: React.Dispatch<React.SetStateAction<oneColor[]>>;
  allAvailablePots: onePot[];
  setAllAvailablePots: React.Dispatch<React.SetStateAction<onePot[]>>;
  openEditPot: boolean;
  setOpenEditPot: React.Dispatch<React.SetStateAction<boolean>>;
  singleEditingPot: onePot | null;
  setSingleEditingPot: React.Dispatch<React.SetStateAction<onePot | null>>;
  openDeletePot: boolean;
  setOpenDeletePot: React.Dispatch<React.SetStateAction<boolean>>;
  singleDeletingPot: onePot | null;
  setSingleDeletePot: React.Dispatch<React.SetStateAction<onePot | null>>;
  openAddMoney: boolean;
  setOpenAddMoney: React.Dispatch<React.SetStateAction<boolean>>;
  singleAddMoneyDetails: onePot | null;
  setSingleAddMoneyDetails: React.Dispatch<React.SetStateAction<onePot | null>>;
  openWithdrawMoney: boolean;
  setOpenWithdrawMoney: React.Dispatch<React.SetStateAction<boolean>>;
  singleWithdrawMoneyDetails: onePot | null;
  setSingleWithdrawMoneyDetails: React.Dispatch<
    React.SetStateAction<onePot | null>
  >;
}

export type myError = {
  target: string;
  category: string;
  color: string;
};

export type myErrorTwo = {
  maximumSpend: string;
  category: string;
  color: string;
};

export type myErrorThree = {
  potName: string;
  target: string;
  color: string;
};

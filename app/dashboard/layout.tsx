"use client";
import SideNavbar from "@/app/components/SideNavbar";
import DownNavbar from "../components/DownNavbar";
import AddBudget from "../components/AddBudget";
import EditBudget from "../components/EditBudget";
import { useFinanceContext } from "../context/FinanceContext";
import DeleteBudget from "../components/DeleteBudget";
import AddPot from "../components/AddPot";
import EditPot from "../components/EditPot";
import DeletePot from "../components/DeletePot";
import AddMoney from "../components/AddMoney";
import WithdrawMoney from "../components/WithdrawMoney";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const myValue = useFinanceContext();
  return (
    <div className="dashboardLayout">
      <div className="dashboardLayout-leftSide">
        <SideNavbar />
      </div>
      <div className="dashboardLayout-rightSide">{children}</div>
      <div className="dashboardLayout-downSide">
        <DownNavbar />
      </div>
      {myValue?.openAddBudget && <AddBudget />}

      {myValue?.openEditBudget && <EditBudget />}
      {myValue?.openDeleteBudget && <DeleteBudget />}
      {myValue?.openAddPot && <AddPot />}
      {myValue?.openEditPot && <EditPot />}
      {myValue?.openDeletePot && <DeletePot />}
      {myValue?.openAddMoney && <AddMoney />}
      {myValue?.openWithdrawMoney && <WithdrawMoney />}
    </div>
  );
};

export default dashboardLayout;

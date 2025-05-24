import React from "react";
import "@/app/styles/deleteComponent.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import { useFinanceContext } from "../context/FinanceContext";

const DeleteBudget = () => {
  const myValues = useFinanceContext()!;

  const confirmDeletion = () => {
    const updatedArray = myValues?.allAvailableBudget.filter(
      (item) => item.id !== myValues?.singleDeletingBudget?.id
    );
    const updatedColorArray = myValues?.allAvailableColors.map((item) =>
      item.hex === myValues?.singleDeletingBudget?.theme
        ? { ...item, alreadyUsed: false }
        : item
    );
    myValues?.setAllAvailableColors(updatedColorArray);
    myValues?.setAllAvailableBudget(updatedArray);
    myValues?.setOpenDeleteBudget(false);
  };

  return (
    <div
      className="deleteBudget"
      onClick={() => myValues?.setOpenDeleteBudget(false)}>
      <div className="deleteBudget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="deleteBudget-modal-title">
          <h2>Delete ‘{myValues?.singleDeletingBudget?.category}’?</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenDeleteBudget(false)}
          />
        </div>
        <p>
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <button onClick={confirmDeletion}>Yes, Confirm Deletion</button>
        <nav onClick={() => myValues?.setOpenDeleteBudget(false)}>
          No, Go Back
        </nav>
      </div>
    </div>
  );
};

export default DeleteBudget;

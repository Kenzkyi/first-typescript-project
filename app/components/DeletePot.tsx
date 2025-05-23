import React from "react";
import "@/app/styles/deleteComponent.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import { useFinanceContext } from "../context/FinanceContext";

const DeleteBudget = () => {
  const myValues = useFinanceContext();

  const confirmDeletion = () => {
    const updatedArray = myValues?.allAvailablePots.filter(
      (item) => item.id !== myValues?.singleDeletingPot.id
    )!;
    const updatedColorArray = myValues?.allAvailablePotColors.map((item) =>
      item.hex === myValues?.singleDeletingPot.theme
        ? { ...item, alreadyUsed: false }
        : item
    )!;
    myValues?.setAllAvailablePotColors(updatedColorArray);
    myValues?.setAllAvailablePots(updatedArray);
    myValues?.setOpenDeletePot(false);
  };

  return (
    <div
      className="deleteBudget"
      onClick={() => myValues?.setOpenDeletePot(false)}>
      <div className="deleteBudget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="deleteBudget-modal-title">
          <h2>Delete ‘{myValues?.singleDeletingPot.name}’?</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenDeletePot(false)}
          />
        </div>
        <p>
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>
        <button onClick={confirmDeletion}>Yes, Confirm Deletion</button>
        <nav onClick={() => myValues?.setOpenDeletePot(false)}>No, Go Back</nav>
      </div>
    </div>
  );
};

export default DeleteBudget;

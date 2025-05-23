"use client";
import "@/app/styles/addMoney.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import { useState } from "react";
import { useFinanceContext } from "../context/FinanceContext";

const AddMoney = () => {
  const myValues = useFinanceContext()!;
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(
    myValues?.singleAddMoneyDetails?.total
  );

  const onConfirmAddition = () => {
    if (Number(amount) >= 1) {
      const updatedArray = myValues?.allAvailablePots.map((item) =>
        item.id === myValues?.singleAddMoneyDetails.id
          ? { ...item, total: newAmount }
          : item
      )!;
      myValues?.setAllAvailablePots(updatedArray);
      myValues?.setOpenAddMoney(false);
    } else {
      setError("Input a valid amount");
    }
  };

  return (
    <div className="addMoney" onClick={() => myValues?.setOpenAddMoney(false)}>
      <div className="addMoney-modal" onClick={(e) => e.stopPropagation()}>
        <div className="addMoney-modal-title">
          <h2>Add to ‘{myValues?.singleAddMoneyDetails?.name}’</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenAddMoney(false)}
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>
        <main>
          <header>
            <h6>New Amount</h6>
            <h5>${newAmount}</h5>
          </header>
          <footer>
            <section>
              <div
                style={{
                  width: `${(
                    (myValues?.singleAddMoneyDetails.total /
                      myValues?.singleAddMoneyDetails.target) *
                    100
                  ).toFixed(2)}%`,
                }}></div>
              <aside
                style={{
                  width: `${(
                    (Number(amount) / myValues?.singleAddMoneyDetails.target) *
                    100
                  ).toFixed(2)}%`,
                  maxWidth: `${(
                    100 -
                    (myValues?.singleAddMoneyDetails.total /
                      myValues?.singleAddMoneyDetails.target) *
                      100
                  ).toFixed(2)}%`,
                }}></aside>
            </section>
            <article>
              <h3>{`${(
                (Number(amount) / myValues?.singleAddMoneyDetails.target) *
                100
              ).toFixed(2)}%`}</h3>
              <h4>Target of ${myValues?.singleAddMoneyDetails.target}</h4>
            </article>
          </footer>
        </main>
        <nav>
          <label>Amount to Add</label>
          <input
            autoFocus
            type="text"
            placeholder="$ e.g. 200"
            value={amount}
            onChange={(e) => {
              setError("");
              const value = Number(e.target.value);
              if (
                value + Number(myValues?.singleAddMoneyDetails.total) <=
                myValues?.singleAddMoneyDetails.target
              ) {
                setAmount(Number(e.target.value));
                setNewAmount(
                  Number(myValues?.singleAddMoneyDetails.total) +
                    Number(e.target.value)
                );
              }
            }}
          />
          <small>{error}</small>
        </nav>
        <button onClick={onConfirmAddition}>Confirm Addition</button>
      </div>
    </div>
  );
};

export default AddMoney;

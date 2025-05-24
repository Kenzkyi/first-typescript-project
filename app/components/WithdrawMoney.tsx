"use client";
import "@/app/styles/addMoney.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import { useState } from "react";
import { useFinanceContext } from "../context/FinanceContext";

const WithdrawMoney = () => {
  const myValues = useFinanceContext()!;
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const [newAmount, setNewAmount] = useState<number>(
    myValues?.singleWithdrawMoneyDetails?.total
  );

  const onConfirmWithdrawal = () => {
    if (Number(amount) >= 1 && !newAmount.toString().startsWith("-")) {
      const updatedArray = myValues?.allAvailablePots.map((item) =>
        item.id === myValues?.singleWithdrawMoneyDetails.id
          ? { ...item, total: newAmount }
          : item
      );
      myValues?.setAllAvailablePots(updatedArray);
      myValues?.setOpenWithdrawMoney(false);
    } else {
      setError("Input a valid amount");
    }
  };

  return (
    <div
      className="addMoney"
      onClick={() => myValues?.setOpenWithdrawMoney(false)}>
      <div className="addMoney-modal" onClick={(e) => e.stopPropagation()}>
        <div className="addMoney-modal-title">
          <h2>Withdraw from ‘{myValues?.singleWithdrawMoneyDetails.name}’</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenWithdrawMoney(false)}
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
                  display: "flex",
                  background: "transparent",
                  borderRadius: 4,
                  gap: 2,
                  width: `${
                    (myValues?.singleWithdrawMoneyDetails.total /
                      myValues?.singleWithdrawMoneyDetails.target) *
                    100
                  }%`,
                  maxWidth: `${
                    (myValues?.singleWithdrawMoneyDetails.total /
                      myValues?.singleWithdrawMoneyDetails.target) *
                    100
                  }%`,
                }}>
                <aside
                  style={{
                    backgroundColor: "black",
                    borderRadius: "4px 0px 0px 4px",
                    width: newAmount.toString().startsWith("-")
                      ? "0%"
                      : `${
                          100 -
                          (Number(amount) /
                            myValues?.singleWithdrawMoneyDetails.total) *
                            100
                        }%`,
                  }}></aside>
                <aside
                  style={{
                    backgroundColor: "red",
                    width: newAmount.toString().startsWith("-")
                      ? "100%"
                      : `${
                          (Number(amount) /
                            myValues?.singleWithdrawMoneyDetails.total) *
                          100
                        }%`,
                    maxWidth: `100%`,
                  }}></aside>
              </div>
            </section>
            <article>
              <h3>{`${(
                (Number(amount) / myValues?.singleWithdrawMoneyDetails.target) *
                100
              ).toFixed(2)}%`}</h3>
              <h4>Target of ${myValues?.singleWithdrawMoneyDetails.target}</h4>
            </article>
          </footer>
        </main>
        <nav>
          <label>Amount to Withdraw</label>
          <input
            autoFocus
            type="text"
            placeholder="$ e.g. 200"
            value={amount}
            onChange={(e) => {
              setError("");
              const value = Number(e.target.value);
              if (value <= myValues?.singleWithdrawMoneyDetails.total) {
                setAmount(Number(e.target.value));
                setNewAmount(
                  Number(myValues?.singleWithdrawMoneyDetails.total) -
                    Number(e.target.value)
                );
              }
            }}
          />
          <small>{error}</small>
        </nav>
        <button onClick={onConfirmWithdrawal}>Confirm Withdrawal</button>
      </div>
    </div>
  );
};

export default WithdrawMoney;

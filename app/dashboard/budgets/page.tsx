"use client";
import React, { useState } from "react";
import "@/app/styles/budgets.scss";
import Image from "next/image";
import budgetsChart from "@/app/asset/public/budgetChart.png";
import threeDots from "@/app/asset/public/threeDots.svg";
import seeMore from "@/app/asset/public/seeMoreArrow.svg";
import { allTransactions } from "@/app/asset/datas";
import { useFinanceContext } from "@/app/context/FinanceContext";
import { oneBudget } from "@/app/components/model";

const Budgets = () => {
  const [showThreedots, setShowThreedots] = useState<number | null>(null);
  const myValues = useFinanceContext()!;

  const onclickOnEditBudget = (budgetItem: oneBudget) => {
    myValues?.setSingleEditingBudget(budgetItem);
    myValues?.setOpenEditBudget(true);
    setShowThreedots(null);
  };

  const onclickOnDeleteBudget = (budgetItem: oneBudget) => {
    myValues?.setSingleDeleteBudget(budgetItem);
    myValues?.setOpenDeleteBudget(true);
    setShowThreedots(null);
  };

  return (
    <div className="budgets" onClick={() => setShowThreedots(null)}>
      <div className="budgets-title">
        <h3>Budgets</h3>
        <button onClick={() => myValues?.setOpenAddBudget(true)}>
          + Add New Budget
        </button>
      </div>
      <div className="budgets-mainHolder">
        <div className="budgets-mainHolderLeft">
          <nav>
            <Image
              height={240}
              width={240}
              src={budgetsChart}
              alt="budget chart"
            />
          </nav>
          <main>
            <h2>Spending Summary</h2>
            <section>
              {myValues?.allAvailableBudget.map(
                (item: oneBudget, index: number) => (
                  <article style={{ border: "none" }} key={index}>
                    <div>
                      <header>
                        <aside style={{ backgroundColor: item.theme }}></aside>
                        <p>{item.category}</p>
                      </header>
                      <footer style={{ justifyContent: "flex-end" }}>
                        <h5>${item.spent}</h5>
                        <h6>of ${item.maximum}</h6>
                      </footer>
                    </div>
                  </article>
                )
              )}
            </section>
          </main>
        </div>
        <div className="budgets-mainHolderRight">
          {myValues?.allAvailableBudget.map(
            (item: oneBudget, index: number) => (
              <div className="budgets-mainContent" key={index}>
                <div className="budgets-mainContent-title">
                  <main>
                    <aside style={{ backgroundColor: item.theme }}></aside>
                    <h6>{item.category}</h6>
                  </main>
                  <nav>
                    <Image
                      src={threeDots}
                      height={3.5}
                      width={13.5}
                      alt="dots"
                      onClick={(e) => {
                        setShowThreedots(index);
                        e.stopPropagation();
                      }}
                    />
                    {showThreedots === index ? (
                      <div>
                        <section style={{ borderTop: "none" }}>
                          <article
                            onClick={(e) => {
                              onclickOnEditBudget(item);
                              e.stopPropagation();
                            }}>
                            Edit Budget
                          </article>
                        </section>
                        <section>
                          <article
                            style={{ color: "red" }}
                            onClick={(e) => {
                              onclickOnDeleteBudget(item);
                              e.stopPropagation();
                            }}>
                            Delete Budget
                          </article>
                        </section>
                      </div>
                    ) : null}
                  </nav>
                </div>
                <div className="budgets-mainContent-amountBar">
                  <section>Maximum of ${item.maximum.toFixed(2)}</section>
                  <nav style={{ maxWidth: "100%" }}>
                    <aside
                      style={{
                        backgroundColor: item.theme,
                        width: `${(item.spent / item.maximum) * 100}%`,
                      }}></aside>
                  </nav>
                  <main>
                    <article>
                      <aside style={{ backgroundColor: item.theme }}></aside>
                      <section>
                        <p>Spent</p>
                        <h6>${item.spent.toFixed(2)}</h6>
                      </section>
                    </article>
                    <article>
                      <aside style={{ backgroundColor: "#F8F4F0" }}></aside>
                      <section>
                        <p>Remaining</p>
                        <h6>${item.remaining.toFixed(2)}</h6>
                      </section>
                    </article>
                  </main>
                </div>
                <div className="budgets-mainContent-latestSpending">
                  <header>
                    <h4>Latest Spending</h4>
                    <button>
                      <p>See All</p>
                      <Image
                        src={seeMore}
                        width={12}
                        height={12}
                        alt="see more"
                      />
                    </button>
                  </header>
                  <footer>
                    {allTransactions
                      .filter((items) => items.category === item.category)
                      .slice(0, 3)
                      .map((element, indexes) => (
                        <main
                          key={indexes}
                          style={{
                            borderTop:
                              indexes === 0 ? "none" : "1px solid #69686830",
                          }}>
                          <article>
                            <section>
                              <Image
                                height={32}
                                width={32}
                                src={element?.avatar}
                                alt=""
                                style={{ borderRadius: "100%" }}
                              />
                              <h5>{element?.name}</h5>
                            </section>
                            <aside>
                              <h6>-${element?.amount.toFixed(2).slice(1)}</h6>
                              <p>{element?.date.slice(0, 10)}</p>
                            </aside>
                          </article>
                        </main>
                      ))}
                  </footer>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Budgets;

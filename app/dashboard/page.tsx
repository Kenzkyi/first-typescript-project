import React from "react";
import "@/app/styles/overview.scss";
import Link from "next/link";
import Image from "next/image";
import seeMore from "@/app/asset/public/seeMoreArrow.svg";
import cashBag from "@/app/asset/public/cashBag.svg";
import budgetsChart from "@/app/asset/public/budgetChart.png";
import { allBudgets, allTransactions } from "../asset/datas";

const Overview = () => {
  return (
    <div className="overview">
      <div className="overview-title">
        <h1>Overview</h1>
      </div>
      <div className="overview-summary">
        <main>
          <h6>Current Balance</h6>
          <h5>$4,836.00</h5>
        </main>
        <article>
          <h6>Income</h6>
          <h5>$3,814.25</h5>
        </article>
        <nav>
          <h6>Expenses</h6>
          <h5>$1,700.50</h5>
        </nav>
      </div>
      <div className="overview-content">
        <div className="overview-contentLeft">
          <div className="overview-contentLeftUp">
            <header>
              <h4>Pots</h4>
              <Link
                href={"/dashboard/pots"}
                style={{ textDecoration: "none", background: "transparent" }}>
                <button>
                  <p>See Details</p>
                  <Image src={seeMore} width={12} height={12} alt="see more" />
                </button>
              </Link>
            </header>
            <footer>
              <nav>
                <Image height={40} width={40} src={cashBag} alt="pots" />
                <div>
                  <p>Total Saved</p>
                  <h6>$850</h6>
                </div>
              </nav>
              <main>
                <section>
                  <aside></aside>
                  <div>
                    <p>Savings</p>
                    <h5>$159</h5>
                  </div>
                </section>
                <section>
                  <aside style={{ backgroundColor: "#82C9D7" }}></aside>
                  <div>
                    <p>Gift</p>
                    <h5>$40</h5>
                  </div>
                </section>
                <section>
                  <aside style={{ backgroundColor: "#626070" }}></aside>
                  <div>
                    <p>Concert Ticket</p>
                    <h5>$110</h5>
                  </div>
                </section>
                <section>
                  <aside style={{ backgroundColor: "#F2CDAC" }}></aside>
                  <div>
                    <p>New Laptop</p>
                    <h5>$10</h5>
                  </div>
                </section>
              </main>
            </footer>
          </div>
          <div className="overview-contentLeftDown">
            <header>
              <h4>Transactions</h4>
              <Link
                href={"/dashboard/transactions"}
                style={{ textDecoration: "none" }}>
                <button>
                  <p>View All</p>
                  <Image src={seeMore} width={12} height={12} alt="see more" />
                </button>
              </Link>
            </header>
            <footer>
              {allTransactions.slice(0, 5).map((item, index) => (
                <main
                  key={index}
                  style={{
                    borderTop: index === 0 ? "0px" : "1px solid #F2F2F2",
                  }}>
                  <nav>
                    <article>
                      <Image
                        style={{ borderRadius: "100%" }}
                        height={40}
                        width={40}
                        src={item?.avatar}
                        alt={item?.name}
                      />
                      <h5>{item?.name}</h5>
                    </article>
                    <div>
                      {item.amount.toString().startsWith("-") ? (
                        <h6 style={{ color: "black" }}>
                          -${item?.amount.toFixed(2).toString().slice(1)}
                        </h6>
                      ) : (
                        <h6>+${item?.amount.toFixed(2)}</h6>
                      )}
                      <p>{item?.date.slice(0, 10)}</p>
                    </div>
                  </nav>
                </main>
              ))}
            </footer>
          </div>
        </div>
        <div className="overview-contentRight">
          <div className="overview-contentRightUp">
            <header>
              <h4>Budgets</h4>
              <Link
                style={{ textDecoration: "none" }}
                href={"/dashboard/budgets"}>
                <button>
                  <p>See Details</p>
                  <Image src={seeMore} width={12} height={12} alt="see more" />
                </button>
              </Link>
            </header>
            <footer>
              <Image
                height={220}
                width={220}
                src={budgetsChart}
                alt="budget chart"
              />
              <main>
                {allBudgets?.map((item, index) => (
                  <article key={index}>
                    <aside style={{ backgroundColor: item?.theme }}></aside>
                    <div>
                      <h6>{item?.category}</h6>
                      <h5>${item?.maximum.toFixed(2)}</h5>
                    </div>
                  </article>
                ))}
              </main>
            </footer>
          </div>
          <div className="overview-contentRightDown">
            <header>
              <h4>Recurring Bills</h4>
              <Link
                href={"/dashboard/recurring-bills"}
                style={{ textDecoration: "none" }}>
                <button>
                  <p>See Details</p>
                  <Image src={seeMore} width={12} height={12} alt="see more" />
                </button>
              </Link>
            </header>
            <footer>
              <section>
                <p>Paid Bills</p>
                <h6>$190.00</h6>
              </section>
              <section style={{ borderColor: "#F2CDAC" }}>
                <p>Total Upcoming</p>
                <h6>$194.98</h6>
              </section>
              <section style={{ borderColor: "#82C9D7" }}>
                <p>Due Soon</p>
                <h6>$59.98</h6>
              </section>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

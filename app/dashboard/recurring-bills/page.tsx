"use client";
import "@/app/styles/bills.scss";
import Image from "next/image";
import billsIcon from "@/app/asset/public/billsIcon.svg";
import searchIcon from "@/app/asset/public/searchIcon.svg";
import arrowDown from "@/app/asset/public/arrowDown.svg";
import { useState } from "react";
import { allTransactions } from "@/app/asset/datas";
import goodIcon from "@/app/asset/public/goodIcon.svg";
import warningIcon from "@/app/asset/public/warningIcon.svg";
import sortIcon from "@/app/asset/public/sortIcon.svg";

const Bills = () => {
  const sortArrays = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [billsArray, setBillsArray] = useState(
    allTransactions
      .filter((item) => item.recurring === true)
      .sort(
        (a, b) =>
          Number(a.dueDate.slice(8, -2)) - Number(b.dueDate.slice(8, -2))
      )
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [dropDownValue, setDropDownValue] = useState<string>("Latest");
  const [sortArray, setSortArray] = useState<string[]>(sortArrays);

  const onSearchClick = () => {
    const allBills = allTransactions
      .filter((item) => item.recurring === true)
      .sort(
        (a, b) =>
          Number(a.dueDate.slice(8, -2)) - Number(b.dueDate.slice(8, -2))
      );
    const myFilteredArray = allBills.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    switch (dropDownValue) {
      case "Latest":
        setBillsArray(
          myFilteredArray.sort(
            (a, b) =>
              Number(a.dueDate.slice(8, -2)) - Number(b.dueDate.slice(8, -2))
          )
        );
        break;
      case "Oldest":
        setBillsArray(
          myFilteredArray.sort(
            (a, b) =>
              Number(b.dueDate.slice(8, -2)) - Number(a.dueDate.slice(8, -2))
          )
        );
        break;
      case "A to Z":
        setBillsArray(
          myFilteredArray.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Z to A":
        setBillsArray(
          myFilteredArray.sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Highest":
        setBillsArray(myFilteredArray.sort((a, b) => a.amount - b.amount));
        break;
      case "Lowest":
        setBillsArray(myFilteredArray.sort((a, b) => b.amount - a.amount));
        break;

      default:
        setBillsArray(myFilteredArray);
    }
  };

  const onClickDropdown = (value: string) => {
    const allBills = billsArray;
    setSortArray(
      sortArray.map((item) => (item === value ? dropDownValue : item))
    );
    switch (value) {
      case "Latest":
        setBillsArray(
          allBills.sort(
            (a, b) =>
              Number(a.dueDate.slice(8, -2)) - Number(b.dueDate.slice(8, -2))
          )
        );
        break;
      case "Oldest":
        setBillsArray(
          allBills.sort(
            (a, b) =>
              Number(b.dueDate.slice(8, -2)) - Number(a.dueDate.slice(8, -2))
          )
        );
        break;
      case "A to Z":
        setBillsArray(allBills.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "Z to A":
        setBillsArray(allBills.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "Highest":
        setBillsArray(allBills.sort((a, b) => a.amount - b.amount));
        break;
      case "Lowest":
        setBillsArray(allBills.sort((a, b) => b.amount - a.amount));
        break;

      default:
        setBillsArray(allBills);
    }
    setDropDownValue(value);
    setShowSortDropdown(false);
  };

  return (
    <div className="bills" onClick={() => setShowSortDropdown(false)}>
      <div className="bills-title">
        <h2>Recurring Bills</h2>
      </div>
      <div className="bills-body">
        <div className="bills-bodyLeft">
          <div className="bills-bodyLeftUp">
            <Image src={billsIcon} height={26.88} width={31.88} alt="bills" />
            <main>
              <p>Total Bills</p>
              <h3>384.98</h3>
            </main>
          </div>
          <div className="bills-bodyLeftDown">
            <h4>Summary</h4>
            <main>
              <nav style={{ borderTop: "none" }}>
                <article>
                  <p>Paid Bills</p>
                  <h6>4 ($190.00)</h6>
                </article>
              </nav>
              <nav>
                <article>
                  <p>Total Upcoming</p>
                  <h6>4 ($194.98)</h6>
                </article>
              </nav>
              <nav>
                <article style={{ color: "red" }}>
                  <p style={{ color: "red" }}>Due Soon</p>
                  <h6 style={{ color: "red" }}>2 ($59.98)</h6>
                </article>
              </nav>
            </main>
          </div>
        </div>
        <div className="bills-bodyRight">
          <div className="bills-bodyRight-input">
            <main>
              <input
                placeholder="Search bills"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <aside>
                <Image
                  src={searchIcon}
                  width={13}
                  height={13}
                  alt="search"
                  onClick={onSearchClick}
                />
              </aside>
            </main>
            <nav>
              <p>Sort by</p>
              <section
                onClick={(e) => {
                  setShowSortDropdown(!showSortDropdown), e.stopPropagation();
                }}>
                <h6>{dropDownValue}</h6>
                <Image height={6} width={11} src={arrowDown} alt="more" />
              </section>
              <article>
                <Image
                  src={sortIcon}
                  height={15}
                  width={15}
                  alt="sort"
                  onClick={(e) => {
                    setShowSortDropdown(!showSortDropdown), e.stopPropagation();
                  }}
                />
              </article>
              {showSortDropdown && (
                <aside>
                  <ul>
                    <>
                      {sortArray.map((item, index) =>
                        index === 0 ? (
                          <h3 key={index}>{dropDownValue}</h3>
                        ) : (
                          <li
                            key={index}
                            onClick={(e) => {
                              onClickDropdown(item), e.stopPropagation();
                            }}>
                            {item}
                          </li>
                        )
                      )}
                    </>
                  </ul>
                </aside>
              )}
            </nav>
          </div>
          <div className="bills-bodyRight-top">
            <h3>Bill Title</h3>
            <h4>Due Date</h4>
            <h5>Amount</h5>
          </div>
          <div className="bills-bodyRight-content">
            {billsArray.map((item, index) => (
              <main key={index}>
                <article>
                  <nav>
                    <Image
                      style={{ borderRadius: "100%" }}
                      height={32}
                      width={32}
                      src={item.avatar}
                      alt={item.name}
                    />
                    <div>
                      <h6>{item.name}</h6>
                    </div>
                  </nav>
                  <section>
                    <p
                      style={{
                        color:
                          Number(item.dueDate.slice(8, -2)) < 21
                            ? "#277C78"
                            : "#696868",
                      }}>
                      {item.dueDate}
                    </p>
                    <div
                      style={{
                        display:
                          Number(item.dueDate.slice(8, -2)) < 29
                            ? "flex"
                            : "none",
                      }}>
                      {Number(item.dueDate.slice(8, -2)) < 21 ? (
                        <Image
                          src={goodIcon}
                          height={13}
                          width={13}
                          alt="good"
                        />
                      ) : (
                        <Image
                          src={warningIcon}
                          height={13}
                          width={13}
                          alt="warning"
                        />
                      )}
                    </div>
                  </section>
                  <h5>${item.amount.toFixed(2).slice(1)}</h5>
                </article>
                <header>
                  <section>
                    <p
                      style={{
                        color:
                          Number(item.dueDate.slice(8, -2)) < 21
                            ? "#277C78"
                            : "#696868",
                      }}>
                      {item.dueDate}
                    </p>
                    <div
                      style={{
                        display:
                          Number(item.dueDate.slice(8, -2)) < 29
                            ? "flex"
                            : "none",
                      }}>
                      {Number(item.dueDate.slice(8, -2)) < 21 ? (
                        <Image
                          src={goodIcon}
                          height={13}
                          width={13}
                          alt="good"
                        />
                      ) : (
                        <Image
                          src={warningIcon}
                          height={13}
                          width={13}
                          alt="warning"
                        />
                      )}
                    </div>
                  </section>
                  <h5>${item.amount.toFixed(2).slice(1)}</h5>
                </header>
              </main>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;

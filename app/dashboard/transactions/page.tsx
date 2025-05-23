"use client";
import React, { useEffect, useState } from "react";
import "@/app/styles/transactions.scss";
import searchIcon from "@/app/asset/public/searchIcon.svg";
import Image from "next/image";
import arrowDown from "@/app/asset/public/arrowDown.svg";
import seeMore from "@/app/asset/public/seeMoreArrow.svg";
import { allTransactions } from "@/app/asset/datas";
import previousArrow from "@/app/asset/public/previousArrow.png";
import sortIcon from "@/app/asset/public/sortIcon.svg";
import transactionsIcon from "@/app/asset/public/transactionsIcon.svg";

const Transactions = () => {
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [showtransactionDropdown, setShowTransactionDropdown] =
    useState<boolean>(false);
  const [initialSlice, setInitialSlice] = useState<number>(0);
  const [finalSlice, setFinalSlice] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [filteredAllTransaction, setFilteresAllTransaction] =
    useState(allTransactions);
  const [searchInput, setSearchInput] = useState<string>("");
  const [paginationIndex, setPaginationIndex] = useState<number>(4);
  const sortArrays = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
  ];
  const numArray = [1, 2, 3, 4, 5];
  const [dropDownValue, setDropDownValue] = useState<string>("Latest");
  const [sortArray, setSortArray] = useState<string[]>(sortArrays);
  const [category, setCategory] = useState<string>("All Transactions");
  const transactionArrays = [
    "All Transactions",
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
  ];
  const [transactionArray, setTransactionArray] =
    useState<string[]>(transactionArrays);

  const onPageClick = (pageNum: number) => {
    const perPage = 10;
    setInitialSlice(perPage * pageNum);
    setFinalSlice(perPage * pageNum + 10);
    setPageIndex(pageNum);
    window.scrollTo(0, 0);
  };

  const onPrevClick = () => {
    const perPage = 10;
    if (pageIndex !== 0) {
      let prevIndex = pageIndex - 1;
      setInitialSlice(perPage * prevIndex);
      setFinalSlice(perPage * prevIndex + 10);
      setPageIndex(pageIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const onNextClick = () => {
    const perPage = 10;
    if (pageIndex < paginationIndex) {
      let nextIndex = pageIndex + 1;
      setInitialSlice(perPage * nextIndex);
      setFinalSlice(perPage * nextIndex + 10);
      setPageIndex(pageIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const onSearchClick = () => {
    const myFilteredArray = allTransactions.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchInput.toLowerCase())
    );
    switch (dropDownValue) {
      case "Latest":
        setFilteresAllTransaction(
          myFilteredArray.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        break;
      case "Oldest":
        setFilteresAllTransaction(
          myFilteredArray.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
        break;
      case "A to Z":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Z to A":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Highest":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => b.amount - a.amount)
        );
        break;
      case "Lowest":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => a.amount - b.amount)
        );
        break;

      default:
        setFilteresAllTransaction(myFilteredArray);
    }
    setPageIndex(0);
    setInitialSlice(0);
    setFinalSlice(10);
  };

  useEffect(() => {
    if (
      filteredAllTransaction.length >= 40 ||
      filteredAllTransaction.length <= 50
    ) {
      setPaginationIndex(4);
    } else if (
      filteredAllTransaction.length >= 30 ||
      filteredAllTransaction.length < 40
    ) {
      setPaginationIndex(3);
    } else if (
      filteredAllTransaction.length >= 20 ||
      filteredAllTransaction.length < 30
    ) {
      setPaginationIndex(2);
    } else if (
      filteredAllTransaction.length >= 10 ||
      filteredAllTransaction.length < 20
    ) {
      setPaginationIndex(1);
    } else {
      setPaginationIndex(0);
    }
  }, [filteredAllTransaction]);

  const onClickDropdown = (value: string) => {
    setSortArray(
      sortArray.map((item) => (item === value ? dropDownValue : item))
    );
    const allMainTransactions = filteredAllTransaction;
    switch (value) {
      case "Latest":
        setFilteresAllTransaction(
          allMainTransactions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        break;
      case "Oldest":
        setFilteresAllTransaction(
          allMainTransactions.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
        break;
      case "A to Z":
        setFilteresAllTransaction(
          allMainTransactions.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Z to A":
        setFilteresAllTransaction(
          allMainTransactions.sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Highest":
        setFilteresAllTransaction(
          allMainTransactions.sort((a, b) => b.amount - a.amount)
        );
        break;
      case "Lowest":
        setFilteresAllTransaction(
          allMainTransactions.sort((a, b) => a.amount - b.amount)
        );
        break;

      default:
        setFilteresAllTransaction(allMainTransactions);
    }
    setDropDownValue(value);
    setShowSortDropdown(false);
  };

  const onClickCategoryDropDown = (value: string) => {
    setTransactionArray(
      transactionArray.map((item) => (item === value ? category : item))
    );
    let myFilteredArray = [];
    if (value === "All Transactions") {
      myFilteredArray = allTransactions;
    } else {
      myFilteredArray = allTransactions.filter(
        (item) => item.category === value
      );
    }

    switch (dropDownValue) {
      case "Latest":
        setFilteresAllTransaction(
          myFilteredArray.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        break;
      case "Oldest":
        setFilteresAllTransaction(
          myFilteredArray.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
        break;
      case "A to Z":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Z to A":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Highest":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => b.amount - a.amount)
        );
        break;
      case "Lowest":
        setFilteresAllTransaction(
          myFilteredArray.sort((a, b) => a.amount - b.amount)
        );
        break;

      default:
        setFilteresAllTransaction(myFilteredArray);
    }
    setShowTransactionDropdown(false);
    setSearchInput("");
    setPageIndex(0);
    setInitialSlice(0);
    setFinalSlice(10);
    setCategory(value);
  };

  return (
    <div
      className="transactions"
      onClick={() => {
        setShowSortDropdown(false);
        setShowTransactionDropdown(false);
      }}>
      <div className="transactions-title">
        <h3>Transactions</h3>
      </div>
      <div className="transactions-content">
        <div className="transactions-inputField">
          <main>
            <input
              placeholder="Search transaction"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <aside onClick={() => onSearchClick()}>
              <Image src={searchIcon} width={13} height={13} alt="search" />
            </aside>
          </main>
          <nav>
            <article>
              <p>Sort by</p>
              <div
                onClick={(e) => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowTransactionDropdown(false);
                  e.stopPropagation();
                }}>
                <h6>{dropDownValue}</h6>
                <Image height={6} width={11} src={arrowDown} alt="more" />
              </div>
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
                              onClickDropdown(item);
                              e.stopPropagation();
                            }}>
                            {item}
                          </li>
                        )
                      )}
                    </>
                  </ul>
                </aside>
              )}
            </article>
            <section>
              <p>Category</p>
              <div
                onClick={(e) => {
                  setShowTransactionDropdown(!showtransactionDropdown);
                  setShowSortDropdown(false);
                  e.stopPropagation();
                }}>
                <h6>{category}</h6>
                <Image height={6} width={11} src={arrowDown} alt="more" />
              </div>
              {showtransactionDropdown && (
                <aside>
                  <ul>
                    <>
                      {transactionArray.map((item, index) =>
                        index === 0 ? (
                          <h3 key={index}>{category}</h3>
                        ) : (
                          <li
                            onClick={(e) => {
                              onClickCategoryDropDown(item);
                              e.stopPropagation();
                            }}
                            key={index}>
                            {item}
                          </li>
                        )
                      )}
                    </>
                  </ul>
                </aside>
              )}
            </section>
          </nav>
          <footer>
            <header>
              <Image
                src={sortIcon}
                height={15}
                width={15}
                alt="sort"
                onClick={(e) => {
                  setShowSortDropdown(!showSortDropdown);
                  setShowTransactionDropdown(false);
                  e.stopPropagation();
                }}
              />
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
                              onClickDropdown(item);
                              e.stopPropagation();
                            }}>
                            {item}
                          </li>
                        )
                      )}
                    </>
                  </ul>
                </aside>
              )}
            </header>
            <div>
              <Image
                src={transactionsIcon}
                height={15}
                width={16.25}
                alt="transactions"
                onClick={(e) => {
                  setShowTransactionDropdown(!showtransactionDropdown);
                  setShowSortDropdown(false);
                  e.stopPropagation();
                }}
              />
              {showtransactionDropdown && (
                <aside>
                  <ul>
                    <h3>{category}</h3>
                    <>
                      {transactionArray.map((item, index) => (
                        <li
                          onClick={(e) => {
                            onClickCategoryDropDown(item);
                            e.stopPropagation();
                          }}
                          key={index}>
                          {item}
                        </li>
                      ))}
                    </>
                  </ul>
                </aside>
              )}
            </div>
          </footer>
        </div>
        <div className="transactions-tableTop">
          <main>Recipient / Sender</main>
          <nav>Category</nav>
          <article>Transaction Date</article>
          <section>Amount</section>
        </div>
        <div className="transactions-tableBottom">
          {filteredAllTransaction
            .slice(initialSlice, finalSlice)
            .map((item, index) => (
              <main key={index}>
                <article>
                  <section>
                    <Image
                      style={{ borderRadius: "100%" }}
                      height={40}
                      width={40}
                      src={item?.avatar}
                      alt={item?.name}
                    />
                    <div>
                      <h4>{item?.name}</h4>
                      <h3>{item?.category}</h3>
                    </div>
                  </section>
                  <p>{item?.category}</p>
                  <h6>{item?.date.slice(0, 10)}</h6>
                  <aside>
                    {item?.amount.toString().startsWith("-") ? (
                      <h5 style={{ color: "black" }}>
                        -${item?.amount.toFixed(2).slice(1)}
                      </h5>
                    ) : (
                      <h5>+${item?.amount.toFixed(2)}</h5>
                    )}
                    <h2>{item?.date.slice(0, 10)}</h2>
                  </aside>
                </article>
              </main>
            ))}
        </div>
        <div className="transactions-pagination">
          <button className="pagination-previous" onClick={() => onPrevClick()}>
            <Image src={previousArrow} height={10} width={5} alt="Prev" />
            <p>Prev</p>
          </button>
          <nav>
            {numArray.map((item, index) => (
              <aside
                key={index}
                onClick={() => onPageClick(index)}
                style={{
                  backgroundColor: pageIndex === index ? "black" : "white",
                  color: pageIndex === index ? "white" : "black",
                  display: index <= paginationIndex ? "flex" : "none",
                }}>
                <h6>{item}</h6>
              </aside>
            ))}
          </nav>
          <main>
            {pageIndex > 1 ? (
              <article>...</article>
            ) : (
              <>
                <article
                  style={{
                    backgroundColor: pageIndex === 0 ? "black" : "white",
                    color: pageIndex === 0 ? "white" : "black",
                    display: 0 <= paginationIndex ? "flex" : "none",
                  }}>
                  1
                </article>
                <article
                  style={{
                    backgroundColor: pageIndex === 1 ? "black" : "white",
                    color: pageIndex === 1 ? "white" : "black",
                    display: 1 <= paginationIndex ? "flex" : "none",
                  }}>
                  2
                </article>
              </>
            )}
            <>
              {pageIndex < 2 ? (
                <article>...</article>
              ) : (
                <>
                  <article
                    style={{
                      backgroundColor: pageIndex === 2 ? "black" : "white",
                      color: pageIndex === 2 ? "white" : "black",
                      display: 2 <= paginationIndex ? "flex" : "none",
                    }}>
                    3
                  </article>
                  <article
                    style={{
                      backgroundColor: pageIndex === 3 ? "black" : "white",
                      color: pageIndex === 3 ? "white" : "black",
                      display: 3 <= paginationIndex ? "flex" : "none",
                    }}>
                    4
                  </article>
                </>
              )}
            </>
            <article
              style={{
                backgroundColor: pageIndex === 4 ? "black" : "white",
                color: pageIndex === 4 ? "white" : "black",
                display: 4 <= paginationIndex ? "flex" : "none",
              }}>
              5
            </article>
          </main>
          <button className="pagination-next" onClick={() => onNextClick()}>
            <p>Next</p>
            <Image src={seeMore} height={12} width={12} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

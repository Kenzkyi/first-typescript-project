"use client";
import "@/app/styles/addComponent.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import arrowDown from "@/app/asset/public/arrowDown.svg";
import { allTransactions } from "../asset/datas";
import { useEffect, useState } from "react";
import { useFinanceContext } from "../context/FinanceContext";
import { myErrorTwo, oneColor } from "./model";

const AddBudget = () => {
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [maximumSpend, setMaximumSpend] = useState("");
  const [error, setError] = useState<myErrorTwo | null>(null);
  const myValues = useFinanceContext()!;
  const [colorSelected, setColorSelected] = useState({
    name: "Green",
    hex: "#277C78",
    alreadyUsed: true,
  });
  const [categorySelected, setCategorySelected] = useState("Entertainment");
  const category = [
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

  const onClickColor = (myColor: oneColor) => {
    setColorSelected(myColor);
    setShowColorDropdown(false);
  };

  const onCategoryClick = (myCatergory: string) => {
    setCategorySelected(myCatergory);
    setShowCategoryDropdown(false);
  };

  const validateForm = () => {
    const allError = {} as myErrorTwo;
    if (
      myValues?.allAvailableBudget.find(
        (item) => item.category === categorySelected
      )
    ) {
      allError.category = "Category already exist";
    }
    if (maximumSpend.trim() === "") {
      allError.maximumSpend = "Please input amount";
    }
    if (maximumSpend.trim() !== "" && !Number(maximumSpend)) {
      allError.maximumSpend = "Enter a valid amount";
    }
    if (
      myValues?.allAvailableBudget.find(
        (item) => item.theme === colorSelected.hex
      )
    ) {
      allError.color = "This color has been used";
    }

    setError(allError);
    return Object.keys(allError).every((item) => item === "");
  };

  const addOneBudget = () => {
    const id = Number(myValues?.allAvailableBudget.length) + 1;
    if (validateForm()) {
      const obj = {
        category: categorySelected,
        maximum: Number(maximumSpend),
        theme: colorSelected.hex,
        spent: Number(
          allTransactions
            .filter((item) => item.category === categorySelected)
            .reduce((acc, item) => {
              acc += item.amount;
              return acc;
            }, 0)
            .toString()
            .slice(1)
        ),
        remaining: (
          Number(maximumSpend) -
          Number(
            allTransactions
              .filter((item) => item.category === categorySelected)
              .reduce((acc, item) => {
                acc += item.amount;
                return acc;
              }, 0)
              .toString()
              .slice(1)
          )
        )
          .toString()
          .startsWith("-")
          ? 0
          : Number(maximumSpend) -
            Number(
              allTransactions
                .filter((item) => item.category === categorySelected)
                .reduce((acc, item) => {
                  acc += item.amount;
                  return acc;
                }, 0)
                .toString()
                .slice(1)
            ),
      };
      myValues?.setAllAvailableBudget([
        { ...obj, id },
        ...myValues?.allAvailableBudget,
      ]);
      myValues?.setAllAvailableColors(
        myValues?.allAvailableColors.map((item) =>
          item.hex === colorSelected.hex ? { ...item, alreadyUsed: true } : item
        )
      );
      myValues?.setOpenAddBudget(false);
    }
  };

  useEffect(() => {
    const allError = {} as myErrorTwo;
    if (categorySelected) {
      allError.category = "";
    }
    if (maximumSpend) {
      allError.maximumSpend = "";
    }
    if (colorSelected) {
      allError.color = "";
    }

    setError(allError);
  }, [categorySelected, maximumSpend, colorSelected]);

  return (
    <div
      className="addBudget"
      onClick={() => myValues?.setOpenAddBudget(false)}>
      <div
        className="addBudget-modal"
        onClick={(e) => {
          setShowCategoryDropdown(false);
          setShowColorDropdown(false);
          e.stopPropagation();
        }}>
        <div className="addBudget-modal-title">
          <h2>Add New Budget</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenAddBudget(false)}
          />
        </div>
        <p>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>
        <main>
          <nav>
            <label>Budget Category</label>
            <section
              onClick={(e) => {
                setShowCategoryDropdown(true);
                setShowColorDropdown(false);
                e.stopPropagation();
              }}>
              <h6>{categorySelected}</h6>
              <Image src={arrowDown} width={11} height={6} alt="down" />
              {showCategoryDropdown && (
                <aside>
                  {category.map((item, index) => (
                    <header
                      key={index}
                      style={{
                        borderColor: index === 0 ? "white" : "#F2F2F2",
                      }}>
                      <footer
                        onClick={(e) => {
                          onCategoryClick(item);
                          e.stopPropagation();
                        }}>
                        <div className="colorDropdown-holder">
                          <h4>{item}</h4>
                        </div>
                      </footer>
                    </header>
                  ))}
                </aside>
              )}
            </section>
            <small>{error?.category}</small>
          </nav>
          <nav>
            <label>Maximum Spend</label>
            <input
              placeholder="$ e.g 2000"
              value={maximumSpend}
              onChange={(e) => setMaximumSpend(e.target.value)}
            />
            <small>{error?.maximumSpend}</small>
          </nav>
          <nav>
            <label>Theme</label>
            <section
              onClick={(e) => {
                setShowColorDropdown(true);
                setShowCategoryDropdown(false);
                e.stopPropagation();
              }}>
              <article>
                <div style={{ backgroundColor: colorSelected.hex }}></div>
                <h4>{colorSelected.name}</h4>
              </article>
              <Image src={arrowDown} width={11} height={6} alt="down" />
              {showColorDropdown && (
                <aside>
                  {myValues?.allAvailableColors.map((item, index) =>
                    item.alreadyUsed ? (
                      <header
                        key={index}
                        style={{
                          borderColor: index === 0 ? "white" : "#F2F2F2",
                        }}>
                        <footer style={{ cursor: "not-allowed" }}>
                          <div className="colorDropdown-holder">
                            <div style={{ backgroundColor: item.hex }}></div>
                            <h4>{item.name}</h4>
                          </div>
                          <h3>Already used</h3>
                        </footer>
                      </header>
                    ) : (
                      <header
                        key={index}
                        style={{
                          borderColor: index === 0 ? "white" : "#F2F2F2",
                        }}>
                        <footer
                          onClick={(e) => {
                            onClickColor(item);
                            e.stopPropagation();
                          }}>
                          <div className="colorDropdown-holder">
                            <div style={{ backgroundColor: item.hex }}></div>
                            <h4>{item.name}</h4>
                          </div>
                        </footer>
                      </header>
                    )
                  )}
                </aside>
              )}
            </section>
            <small>{error?.color}</small>
          </nav>
        </main>
        <button onClick={() => addOneBudget()}>Add Budget</button>
      </div>
    </div>
  );
};

export default AddBudget;

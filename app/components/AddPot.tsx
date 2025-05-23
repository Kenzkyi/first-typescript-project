"use client";
import "@/app/styles/addComponent.scss";
import cancelIcon from "@/app/asset/public/cancelIcon.svg";
import Image from "next/image";
import arrowDown from "@/app/asset/public/arrowDown.svg";
import { useEffect, useState } from "react";
import { useFinanceContext } from "../context/FinanceContext";
import { myErrorThree, oneColor } from "./model";

const AddPot = () => {
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [target, setTarget] = useState("");
  const [error, setError] = useState<myErrorThree | null>(null);
  const myValues = useFinanceContext();
  const [colorSelected, setColorSelected] = useState({
    name: "Green",
    hex: "#277C78",
    alreadyUsed: true,
  });
  const [potName, setPotName] = useState("");

  const onClickColor = (myColor: oneColor) => {
    setColorSelected(myColor);
    setShowColorDropdown(false);
  };

  const validateForm = () => {
    const allError = {} as myErrorThree;
    if (potName.trim() === "") {
      allError.potName = "Please enter a pot name";
    }
    if (
      myValues?.allAvailablePots.find(
        (item) => item.name.toLowerCase() === potName.toLowerCase()
      )
    ) {
      allError.potName = "Name already exist";
    }
    if (target.trim() === "") {
      allError.target = "Please input amount";
    }
    if (target.trim() !== "" && !Number(target)) {
      allError.target = "Enter a valid amount";
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

  const addOnePot = () => {
    const id = Number(myValues?.allAvailablePots.length) + 1;
    if (validateForm()) {
      const obj = {
        name: potName,
        target: Number(target),
        theme: colorSelected.hex,
        total: 0,
      };
      myValues?.setAllAvailablePots([
        { ...obj, id },
        ...myValues?.allAvailablePots,
      ]);
      myValues?.setAllAvailablePotColors(
        myValues?.allAvailablePotColors.map((item) =>
          item.hex === colorSelected.hex ? { ...item, alreadyUsed: true } : item
        )
      );
      myValues?.setOpenAddPot(false);
    }
  };

  useEffect(() => {
    let allError = {} as myErrorThree;
    if (potName) {
      allError.potName = "";
    }
    if (target) {
      allError.target = "";
    }
    if (colorSelected) {
      allError.color = "";
    }

    setError(allError);
  }, [potName, target, colorSelected]);

  return (
    <div className="addBudget" onClick={() => myValues?.setOpenAddPot(false)}>
      <div
        className="addBudget-modal"
        onClick={(e) => {
          setShowColorDropdown(false);
          e.stopPropagation();
        }}>
        <div className="addBudget-modal-title">
          <h2>Add New Pot</h2>
          <Image
            src={cancelIcon}
            height={25.5}
            width={25.5}
            alt="cancel"
            style={{ cursor: "pointer" }}
            onClick={() => myValues?.setOpenAddPot(false)}
          />
        </div>
        <p>
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>
        <main>
          <nav>
            <label>Pot Name</label>
            <input
              placeholder="e.g. Rainy Days"
              value={potName}
              onChange={(e) => setPotName(e.target.value)}
              maxLength={30}
            />
            <div
              style={{
                height: 18,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <small style={{ width: "fit-content" }}>{error?.potName}</small>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#696868",
                  width: "fit-content",
                }}>
                {30 - potName.length} characters left
              </span>
            </div>
          </nav>
          <nav>
            <label>Target</label>
            <input
              placeholder="$ e.g 2000"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <small>{error?.target}</small>
          </nav>
          <nav>
            <label>Theme</label>
            <section
              onClick={(e) => {
                setShowColorDropdown(true);
                e.stopPropagation();
              }}>
              <article>
                <div style={{ backgroundColor: colorSelected.hex }}></div>
                <h4>{colorSelected.name}</h4>
              </article>
              <Image src={arrowDown} width={11} height={6} alt="down" />
              {showColorDropdown && (
                <aside>
                  {myValues?.allAvailablePotColors.map((item, index) =>
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
        <button onClick={() => addOnePot()}>Add Pot</button>
      </div>
    </div>
  );
};

export default AddPot;

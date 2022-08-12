import { useState, FunctionComponent, useEffect } from "react";
import {
  useMainState,
  useMainStateUpdate,
} from "../Context/MainContext/MainContext";

const ControlPanel: FunctionComponent = () => {
  const maxColumnsNumber = 10;
  const minColumnsNumber = 1;
  const [columnsNumber, setColumnsNumber] = useState(minColumnsNumber);

  const mainState = useMainState();
  const updateMainState = useMainStateUpdate();

  const decrease = () => {
    if (columnsNumber === minColumnsNumber) {
      alert("Mniej niz 0");
    } else {
      setColumnsNumber(columnsNumber - 1);
    }
  };

  const increase = () => {
    if (columnsNumber === maxColumnsNumber) {
      alert("Maksymalna ilosc kolumn");
    } else {
      setColumnsNumber(columnsNumber + 1);
    }
  };

  const setDefaultSet = () => {
    const defaultColumns = [
      { id: 0, title: "One word" },
      { id: 1, title: "Went well" },
      { id: 2, title: "To improve" },
      { id: 3, title: "Actions" },
    ];

    updateMainState({ ...mainState, columns: defaultColumns });
  };

  const generateColumns = () => {
    const columnsLength = mainState.columns.length;

    if (columnsNumber > columnsLength) {
      const columns = [];

      for (let i = columnsLength; i < columnsNumber; i++) {
        columns.push({ id: i, title: "" });
      }

      updateMainState({
        ...mainState,
        columns: [...mainState.columns, ...columns],
      });
    }
  };

  return (
    <div className="control-panel">
      <div className="column-counter">
        <h3>Enter columns number for your dream retro</h3>

        <div className="counter">
          <button title="Decrease" onClick={decrease}>
            -
          </button>
          <span>{columnsNumber}</span>
          <button title="Increase" onClick={increase}>
            +
          </button>
        </div>

        <button title="Generate board" onClick={generateColumns}>
          Generate
        </button>

        <h3>Or try default set</h3>
        <button title="Default board" onClick={setDefaultSet}>
          Default
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

import { useState, FunctionComponent } from "react";

type Props = {
  setColumns: (num: number) => void;
  setDefaultSet: (flag: boolean) => void;
};

const ControlPanel: FunctionComponent<Props> = ({
  setColumns,
  setDefaultSet,
}) => {
  const maxColumnsNumber = 10;
  const minColumnsNumber = 1;

  const [columnsNumber, setColumnsNumber] = useState(minColumnsNumber);

  const decrease = () => {
    if (columnsNumber === minColumnsNumber) {
      alert("Panie, nie da się!");
    } else {
      setColumnsNumber(columnsNumber - 1);
    }
  };

  const increase = () => {
    if (columnsNumber === maxColumnsNumber) {
      alert("Panie, nie da się!");
    } else {
      setColumnsNumber(columnsNumber + 1);
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

        <button
          title="Generate board"
          onClick={() => {
            setColumns(columnsNumber);
            setDefaultSet(false);
          }}
        >
          Generate
        </button>

        <h3>Or try default set :)</h3>
        <button title="Default board" onClick={() => setDefaultSet(true)}>
          Default
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

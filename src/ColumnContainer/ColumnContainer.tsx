import { FunctionComponent } from "react";
import Column from "./Column/Column";
import { useMainState } from "../Context/MainContext/MainContext";

const ColumnContainer: FunctionComponent = () => {
  const mainState = useMainState();

  return (
    <div className="column-wrapper">
      <div className="columns">
        {mainState.columns.map(({ id, title }) => (
          <Column key={id} {...{ columnId: id, columnTitle: title }} />
        ))}
      </div>
    </div>
  );
};

export default ColumnContainer;

import { FunctionComponent, useState } from "react";

import ColumnContainer from "../ColumnContainer/ColumnContainer";
import ControlPanel from "../ControlPanel/ControlPanel";

const RetroMainPage: FunctionComponent = () => {
  const [columns, setColumns] = useState(0);
  const [defaultSet, setDefaultSet] = useState(false);

  return (
    <div className="retro-main-container">
      <ControlPanel {...{ setColumns, setDefaultSet }} />
      <ColumnContainer {...{ columns, defaultSet }} />
    </div>
  );
};

export default RetroMainPage;

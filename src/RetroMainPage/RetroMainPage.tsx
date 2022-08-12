import { FunctionComponent, useState } from "react";

import ColumnContainer from "../ColumnContainer/ColumnContainer";
import ControlPanel from "../ControlPanel/ControlPanel";

const RetroMainPage: FunctionComponent = () => {
  return (
    <div className="retro-main-container">
      <ControlPanel />
      <ColumnContainer />
    </div>
  );
};

export default RetroMainPage;

import { useState, useEffect, FunctionComponent } from "react";
import Column from "./Column/Column";

type optionalProps = {
  columns: number;
  defaultSet: boolean;
};

const ColumnContainer: FunctionComponent<optionalProps> = ({
  columns,
  defaultSet,
}) => {
  const [columnsToRender, setColumnsToRender] = useState(
    [] as { index: number; title: string }[]
  );

  const generateArray = (num: number) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push({ index: i, title: "" });
    }

    return arr;
  };

  useEffect(() => {
    setColumnsToRender(generateArray(columns));
  }, [columns]);

  useEffect(() => {
    const defaultColumns = [
      { index: 0, title: "One word" },
      { index: 1, title: "Went well" },
      { index: 2, title: "To improve" },
      { index: 3, title: "Actions" },
    ];
    if (defaultSet) {
      setColumnsToRender(defaultColumns);
    } else {
      setColumnsToRender(generateArray(columns));
    }
  }, [defaultSet, columns]);

  return (
    <div className="column-wrapper">
      <div className="columns">
        {columnsToRender.map(({ index, title }) => (
          <Column key={index} {...{ columnIndex: index, columnTitle: title }} />
        ))}
      </div>
    </div>
  );
};

export default ColumnContainer;

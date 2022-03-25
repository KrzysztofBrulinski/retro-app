import {
  ChangeEvent,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
} from "react";

type Props = {
  columnIndex: number;
  columnTitle: string;
};

const Column: FunctionComponent<Props> = ({ columnIndex, columnTitle }) => {
  const [startTyping, setStartTyping] = useState(false as boolean);
  const [title, setTitle] = useState("" as string);
  const inputTitle = useRef<HTMLInputElement>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  useEffect(() => {
    if (startTyping && inputTitle?.current) {
      inputTitle.current.focus();
    }
  }, [startTyping]);

  useEffect(() => {
    setTitle(columnTitle);
  }, [columnTitle]);

  return (
    <div className="column" datatype={`column-${columnIndex}`}>
      <div className="title-section">
        <div className="card-color"></div>
        {!startTyping ? (
          <button onClick={() => setStartTyping(true)}>
            <h3 className="card-title">{title || "Type title here"}</h3>
          </button>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e)}
              type="text"
              ref={inputTitle}
            ></input>
            <button onClick={() => setStartTyping(false)} className="save">
              OK
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Column;

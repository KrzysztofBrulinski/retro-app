import {
  ChangeEvent,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
} from "react";

import Card from "../Card/Card";

type Props = {
  columnIndex: number;
  columnTitle: string;
};

const Column: FunctionComponent<Props> = ({ columnIndex, columnTitle }) => {
  const [startTyping, setStartTyping] = useState(false as boolean);
  const [title, setTitle] = useState("" as string);
  const [cards, setCards] = useState([] as number[]);
  const inputTitle = useRef<HTMLInputElement>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const addNewCard = () => setCards([...cards, cards.length]);

  useEffect(() => {
    console.log("cards", cards);
  }, [cards]);

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
        <div className={`card-color set-${columnIndex % 5}`}></div>
        {!startTyping ? (
          <button title="Change title" onClick={() => setStartTyping(true)}>
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
            <button
              title="Confirm"
              onClick={() => setStartTyping(false)}
              className="save"
            >
              OK
            </button>
          </form>
        )}
      </div>
      <button title="Add new card" onClick={addNewCard}>
        + Add new card
      </button>

      <div className="cards">
        {cards.map((index) => (
          <Card
            {...{ columnIndex: columnIndex % 5, cardIndex: index }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;

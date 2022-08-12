import {
  ChangeEvent,
  FunctionComponent,
  useState,
  useRef,
  useEffect,
} from "react";

import Card from "../Card/Card";

import {
  useMainState,
  useMainStateUpdate,
} from "../../Context/MainContext/MainContext";

type Props = {
  columnId: number;
  columnTitle: string;
};

const Column: FunctionComponent<Props> = ({ columnId, columnTitle }) => {
  const [startTyping, setStartTyping] = useState(false as boolean);
  const inputTitle = useRef<HTMLInputElement>(null);

  const mainState = useMainState();
  const updateMainState = useMainStateUpdate();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    mainState.columns[columnId].title = event.target.value;

    updateMainState({ ...mainState });
  };

  const addNewCard = () => {
    const cards = mainState.cards;

    updateMainState({
      ...mainState,
      cards: [...cards, { id: cards.length, text: "", likes: 0, columnId }],
    });
  };

  useEffect(() => {
    if (startTyping && inputTitle?.current) {
      inputTitle.current.focus();
    }
  }, [startTyping]);

  return (
    <div className="column" datatype={`column-${columnId}`}>
      <div className="title-section">
        <div className={`card-color set-${columnId % 5}`}></div>
        {!startTyping ? (
          <button title="Change title" onClick={() => setStartTyping(true)}>
            <h3 className="card-title">{columnTitle || "Type title here"}</h3>
          </button>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={columnTitle}
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
        {mainState.cards.map((card) =>
          card.columnId === columnId ? (
            <Card
              columnId={card.columnId}
              cardId={card.id}
              cardText={card.text}
              cardLikes={card.likes}
              key={card.id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Column;

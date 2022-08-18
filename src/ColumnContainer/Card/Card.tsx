import { FunctionComponent, useEffect, useState, useRef } from "react";

import {
  useMainState,
  useMainStateUpdate,
} from "../../Context/MainContext/MainContext";
type Props = {
  columnId: number;
  cardId: number;
  cardText: string;
  cardLikes: number;
};

const Card: FunctionComponent<Props> = ({
  columnId,
  cardId,
  cardText,
  cardLikes,
}) => {
  const [editTextArea, setEditTextArea] = useState(false as boolean);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const mainState = useMainState();
  const updateMainState = useMainStateUpdate();

  const cssClassID = columnId % 5;

  // focus on textarea after click
  useEffect(() => {
    if (textArea?.current && editTextArea) {
      textArea.current.value = cardText;
      textArea.current.focus();
    }
  }, [textArea, editTextArea, cardText]);

  useEffect(() => {
    setEditTextArea(!cardText);
  }, [cardText]);

  const setLikes = () => {
    mainState.cards[cardId].likes = cardLikes + 1;
    updateMainState({ ...mainState });
  };

  const setText = () => {
    mainState.cards[cardId].text = textArea?.current?.value || cardText || "";
    updateMainState({ ...mainState });
    setEditTextArea(false);
  };

  return (
    <div className={`card-container set-${cssClassID}`}>
      <div className="card-header">
        <p>{`#${cardId + 1}`}</p>

        <div className="like-btn">
          <button onClick={setLikes} title="Vote">
            <svg width="15" height="15" viewBox="0 0 15 15">
              <g fill="none">
                <path
                  fill="#000"
                  d="M7.34.25L4.247 4.733H.25v9.314h12.071l1.703-2.976.022-.041V4.733h-3.362V.25H7.34zM5.082 5.453l2.835-4.106h1.671v4.482h3.363v4.91l-1.264 2.212H5.083V5.453zM1.346 12.95h2.64V5.829h-2.64v7.122z"
                ></path>
                <path
                  stroke="#000"
                  d="M5.082 12.95V5.452l2.834-4.106h1.673V5.83h3.361v4.91l-1.264 2.211H5.082zm-3.735 0h2.639V5.83H1.347v7.12zm9.339-8.218V.25H7.34L4.246 4.732H.25v9.315h12.073l1.701-2.977.023-.04V4.732h-3.361z"
                ></path>
              </g>
            </svg>
          </button>
          <p>{cardLikes > 0 ? cardLikes : ""}</p>
        </div>
      </div>

      <div className="textBox">
        {editTextArea ? (
          <form>
            <textarea
              onBlur={setText}
              ref={textArea}
              name="retro-text"
            ></textarea>
          </form>
        ) : (
          <button title="Card text" onClick={() => setEditTextArea(true)}>
            <h3>{cardText}</h3>
          </button>
        )}
      </div>

      <div className="movment">
        <button
          onClick={() => {
            if (columnId > 0) {
              mainState.cards[cardId].columnId = columnId - 1;
              updateMainState({ ...mainState });
            }
          }}
        >
          left
        </button>
        <button
          onClick={() => {
            if (columnId < mainState.columns.length - 1) {
              mainState.cards[cardId].columnId = columnId + 1;
              updateMainState({ ...mainState });
            }
          }}
        >
          right
        </button>
      </div>
    </div>
  );
};

export default Card;

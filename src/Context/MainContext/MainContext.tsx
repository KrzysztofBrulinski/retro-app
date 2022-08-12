import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactChild,
  ReactElement,
} from "react";

interface DefaultState {
  columns: { id: number; title: string }[];
  cards: { id: number; text: string; columnId: number; likes: number }[];
}

const defaultState: DefaultState = {
  columns: [],
  cards: [],
};
const StateContext = createContext<DefaultState>(defaultState);
const StateContextUpdate = createContext<
  Dispatch<SetStateAction<DefaultState>>
>(() => {});

export const useMainState = (): DefaultState => {
  return useContext(StateContext);
};

export const useMainStateUpdate = (): Dispatch<
  SetStateAction<DefaultState>
> => {
  return useContext(StateContextUpdate);
};

const MainContext = ({ children }: { children: ReactChild }): ReactElement => {
  const [mainState, setMainState] = useState(defaultState);

  return (
    <StateContext.Provider value={mainState}>
      <StateContextUpdate.Provider value={setMainState}>
        {children}
      </StateContextUpdate.Provider>
    </StateContext.Provider>
  );
};

export default MainContext;

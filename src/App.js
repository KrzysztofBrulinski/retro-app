import RetroMainPage from "./RetroMainPage/RetroMainPage";
import MainContext from "./Context/MainContext/MainContext";

const App = () => {
  return (
    <MainContext>
      <RetroMainPage />
    </MainContext>
  );
};

export default App;

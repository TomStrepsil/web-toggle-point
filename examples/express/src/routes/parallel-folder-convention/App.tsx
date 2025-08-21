import TopBox from "./components/TopBox";
import BottomBox from "./components/BottomBox";
import { Provider } from "react-redux";
import store from "./state/store";
import { getFeatures, setValue } from "./toggle-plumbing/featuresStore";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <select
        onChange={({ target: { value: selection } }) => setValue({ selection })}
        defaultValue={getFeatures().selection}
      >
        <option>baseline 🐶</option>
        <option value="feature1">feature 1 🐱</option>
        <option value="feature2">feature 2 🐹</option>
        <option value="feature3">feature 3 🐰</option>
        <option value="feature4">feature 4 🦀</option>
      </select>
      <TopBox />
      <BottomBox />
    </Provider>
  );
}

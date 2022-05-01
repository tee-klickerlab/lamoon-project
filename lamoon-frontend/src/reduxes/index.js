import { createStore } from "redux";
import Reducer from "./reducer";

const mainStore = createStore(Reducer);

export default mainStore;

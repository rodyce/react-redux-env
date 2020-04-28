import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools.

  return createStore(
    rootReducer,
    initialState,
    // This middleware will warn us if we accidentally mutate Redux state.
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}

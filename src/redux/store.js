import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import movieReducer from "./reducers/movieReducer";
// const initialState = {
//   movie: {},
// };
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  movie: movieReducer,
});

// const store = createStore(
//   reducers,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

import { createStore, applyMiddleware, compose } from "redux"
import throttle from "lodash/throttle"

import thunk from "redux-thunk"
import logger from "redux-logger"
import rootReducer from "./reducers"
import { loadState, saveState } from "../localStorage/localStorage"

const middleware = [thunk, logger]
const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middleware))
)

// Throttle: invokes a function at most once per every X milliseconds.
store.subscribe(
  throttle(() => {
    saveState({
      projectReducer: { projects: store.getState().projectReducer.projects },
      taskReducer: store.getState().taskReducer
      // projectReducer: store.getState().projectReducer
    })
  }, 1000)
)
export default store

import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_QUICKTASK_MODAL
} from "../actions/taskAction"
import uuidv4 from "uuid/v4"
import moment from "moment"

const initialState = {
  quickAddModal: false,
  taskQuery: [
    {
      date: moment().format("DD/MM/YYYY"),
      id: uuidv4(),
      projectName: "Inbox",
      task: "test"
    }
  ]
}

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    // ----------------- ADD TASK -----------------
    case ADD_TASK:
      return {
        ...state,
        taskQuery: [...state.taskQuery, action.newTask]
      }
    // ----------------- DELETE PROJECT -----------------
    case DELETE_TASK:
      return {
        ...state,
        taskQuery: state.taskQuery.filter(task => task.id !== action.id)
      }

    // ----------------- TOGGLER QUICK ADD TASK MODAL -----------------
    case TOGGLE_QUICKTASK_MODAL:
      return {
        ...state,
        quickAddModal: !state.quickAddModal
      }
    // ---------------------- RETURN STATE ----------------------
    default:
      return state
  }
}

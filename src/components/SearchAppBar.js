import React, { useEffect, useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import SearchIcon from "@material-ui/icons/Search"
import AddIcon from "@material-ui/icons/Add"
import CodeIcon from "@material-ui/icons/Code"
import SimpleModal from "./SimpleModal"
import Divider from "@material-ui/core/Divider"
import QuickAddTask from "./QuickAddTask"
import { useSelector, useDispatch } from "react-redux"
import { toggleQuickAddModal, searchTask } from "../store/actions/taskAction"
import {
  darkModeAction,
  setActiveProject
} from "../store/actions/projectAction"

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  darkModeIcon: {
    cursor: "pointer"
  }
}))

export default function SearchAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { taskQuery, quickAddModal } = useSelector(state => state.taskReducer)
  const { darkMode } = useSelector(state => state.projectReducer)
  const [dark, setDark] = useState(false)

  const addTask = (
    <>
      <h2>Quick Add Task</h2>
      <Divider />
      <QuickAddTask handleClose={() => dispatch(toggleQuickAddModal())} />
    </>
  )

  useEffect(() => {
    const color = dark ? "#2E3B55" : "#da4d43"
    dispatch(darkModeAction(color))
  }, [dark])

  const switchToDarkMode = () => {
    setDark(!dark)
  }
  const filterList = event => {
    dispatch(setActiveProject("Inbox"))
    let updatedList = taskQuery
    updatedList = updatedList.filter(function(item) {
      return (
        item.task.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      )
    })
    dispatch(searchTask(updatedList))
  }
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ background: `${darkMode}` }}
    >
      <Toolbar variant="dense">
        <Typography className={classes.title} variant="h6" noWrap>
          <CodeIcon />
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Quick Find"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "Quick Find" }}
            onChange={filterList}
          />
        </div>

        <SimpleModal
          content={addTask}
          toggleHandler={() => dispatch(toggleQuickAddModal())}
          open={quickAddModal}
        >
          <AddIcon />
        </SimpleModal>

        <Brightness4Icon
          onClick={switchToDarkMode}
          className={classes.darkModeIcon}
        />
      </Toolbar>
    </AppBar>
  )
}

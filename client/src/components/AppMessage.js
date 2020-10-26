import React, {useEffect, useState} from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import {useDispatch, useSelector} from "react-redux"
import {clearMessage} from "../redux/actions/appActions"

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

export const AppMessage = () => {
  const classes = useStyles()
  // TODO Сделать селектор
  const message = useSelector(state => state.app.message)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
    dispatch(clearMessage)
  }

  useEffect(() => {
    if (message) {
      setOpen(true)
    }
  }, [message])

  if (open) {
    return (
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.type}>
            {message.text}
          </Alert>
        </Snackbar>
      </div>
    )
  } else {
    return null
  }
}

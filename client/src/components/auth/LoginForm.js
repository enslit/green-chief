import React from "react"
import {
  Avatar,
  Button,
  Box,
  Typography,
} from "@material-ui/core"

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"
import { Copyright } from "../Copyright"
import {Field, reduxForm} from "redux-form"
import InputField from "../controls/InputField"
import Preloader from "../Preloader"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '350px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  navLink: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Укажите адрес электронной почты'
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Не корректный адрес электронной почты'
  }

  if (!values.password) {
    errors.password = 'Введите пароль'
  }

  return errors
}

const LoginForm = ({handleSubmit, loading }) => {
  const classes = useStyles()
  return (
    <>
      {loading && <Preloader />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Field
            name="email"
            component={InputField}
            id="email"
            label="Email"
            type={"text"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            autoFocus
          />
          <Field
            name="password"
            component={InputField}
            id="password"
            label="Пароль"
            type={"password"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoComplete="current-password"
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Войти
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </>
  )
}

export default reduxForm({form: 'login', validate})(LoginForm)
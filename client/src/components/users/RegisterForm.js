import React from "react"
import { Button, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import {Field, reduxForm} from "redux-form"
import InputField from "../controls/InputField"
import SelectField from "../controls/SelectField"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '450px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Укажите имя'
  }


  if (!values.email) {
    errors.email = 'Введите адрес электронной почты'
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Введите корректный адрес электронной почты'
  }

  if (!values.password) {
    errors.password = 'Введите пароль'
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть не менее 8 символов'
  }

  return errors
}

const RegisterForm = (props) => {
  const classes = useStyles()
  const {handleSubmit, loading, coupons} = props
  const couponOptions = coupons.map(coupon => ({id: coupon.id, value: coupon.code}))

  return (
    <div className={classes.paper}>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
        onError={(errors) => console.log(errors)}
        noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              name={"name"}
              component={InputField}
              id={"name"}
              label={"Имя"}
              type={"text"}
              variant={"outlined"}
              required
              autoComplete={"name"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="email"
              component={InputField}
              id="email"
              label="Email"
              type={"email"}
              variant="outlined"
              required
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="password"
              component={InputField}
              id="password"
              label="Пароль"
              type="password"
              variant="outlined"
              required
              fullWidth
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name={"coupon"}
              component={SelectField}
              options={couponOptions}
              id={"coupon"}
              label={"Купон"}
              variant={"outlined"}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          disabled={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          Зарегистрировать
        </Button>
      </form>
    </div>
  )
}

export default reduxForm({form: 'register', validate})(RegisterForm)
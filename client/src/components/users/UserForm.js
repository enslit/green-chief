import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import {Field, reduxForm} from "redux-form"
import InputField from "../controls/InputField"
import {connect, useSelector} from "react-redux"
import {getLoading} from "../../redux/selectors/selectors"
import {deleteUser} from "../../redux/thunks/usersThunks"
import CheckboxField from "../controls/CheckboxField"
import SelectField from "../controls/SelectField"

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: '450px',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
	},
	buttonGroup: {
		marginTop: theme.spacing(3),
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

	if (!values.name) {
		errors.name = 'Укажите имя'
	}

	return errors
}

let UserForm = ({handleSubmit, initialValues, deleteUser, coupons, loading}) => {
	const classes = useStyles()
	let couponOptions = []
	if (coupons.length > 0) {
		couponOptions = coupons.map(coupon => ({id: coupon.id, value: coupon.code}))
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Paper elevation={2} className={classes.paper}>
					<form
						onSubmit={handleSubmit}
						onError={(errors) => console.log(errors)}
						noValidate
						className={classes.form}>
						<Typography variant={'subtitle2'} component={'em'}>{initialValues && initialValues.email}</Typography>
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
									name={"coupon"}
									component={SelectField}
									options={couponOptions}
									id={"coupon"}
									label={"Купон"}
									variant={"outlined"}
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									name={"isAdmin"}
									type={"checkbox"}
									component={CheckboxField}
									label="Администратор"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									name={"isBlocked"}
									type={"checkbox"}
									component={CheckboxField}
									label="Заблокирован"
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item sm={6} xs={12}>
										<Button
											disabled={loading}
											type="submit"
											fullWidth
											variant="contained"
											color="primary">
											Сохранить
										</Button>
									</Grid>
									<Grid item sm={6} xs={12}>
										<Button
											onClick={() => {
												deleteUser(initialValues._id)
											}}
											disabled={loading}
											type="button"
											fullWidth
											variant="contained"
											color="secondary">
											Удалить
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
		</Grid>
	);
}

UserForm = reduxForm({form: 'userDetail', validate})(UserForm)

UserForm = connect(
	state => ({
		initialValues: state.users.detail,
		loading: getLoading(state)
	}),
	{deleteUser}
)(UserForm)

export default UserForm
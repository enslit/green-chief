import React from 'react';
import {CardContent, Grid, Typography} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import {NavLink} from "react-router-dom"
import {makeStyles} from "@material-ui/styles"


const useStyles = makeStyles(theme => ({
	list: {
		marginTop: theme.spacing(2)
	},
	navLink: {
		textDecoration: 'none',
		color: 'inherit'
	},
	cardContent: {
		display: 'flex',
		alignItems: 'center'
	},
	name: {
		marginRight: theme.spacing(4)
	},
	email: {
		marginRight: theme.spacing(4)
	},
	blocked: {
		color: theme.palette.error.main
	}
}))

const UserLine = ({user}) => {
	const classes = useStyles()
	return (
		<Grid item xs={12}>
			<NavLink to={'/users/' + user._id} className={classes.navLink}>
				<Card raised>
					<CardContent className={classes.cardContent}>
						<Typography variant={'h5'} component={'h2'} className={classes.name}>
							{user.name}
						</Typography>
						<Typography variant={'subtitle2'} component={'em'} className={classes.email}>
							{user.email}
						</Typography>
						<Typography variant={"body1"} component={'p'}>
							{user.coupon && user.coupon.code}
						</Typography>
					</CardContent>
				</Card>
			</NavLink>
		</Grid>
	)
}

function UsersList({ users }) {
	const classes = useStyles()
	return (
		<Grid container spacing={2} className={classes.list}>
			{users.map(user => <UserLine key={user._id} user={user} />)}
		</Grid>
	);
}

export default UsersList;
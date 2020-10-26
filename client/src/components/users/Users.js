import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {setAppTitle} from "../../redux/actions/appActions"
import {fetchUsers} from "../../redux/thunks/usersThunks"
import {getUsersSelector} from "../../redux/selectors/selectors"
import {getLoading} from "../../redux/selectors/selectors"
import Preloader from "../Preloader"
import UsersList from "./UsersList"
import {Fab, Typography} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import {NavLink} from "react-router-dom"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
	iconAdd: {
		position: 'fixed',
		bottom: theme.spacing(3),
		right: theme.spacing(3)
	}
}))

const Users = () => {
	const dispatch = useDispatch()
	const usersList = useSelector(state => getUsersSelector(state))
	const loading = useSelector(state => getLoading(state))
	const classes = useStyles()

	useEffect(() => {
		dispatch(setAppTitle('Пользователи'))
		dispatch(fetchUsers())
	}, [dispatch])

	return (
		<>
			{
				loading
					? <Preloader />
					: (usersList.length > 0)
						? <UsersList users={usersList} />
						: <Typography variant={'h5'} component={'h2'}>Пользователей нет</Typography>
			}
			<NavLink to={'/user/add'}>
				<Fab color={'primary'} aria-label={'add'} className={classes.iconAdd}>
					<AddIcon />
				</Fab>
			</NavLink>
		</>
	)
}

export default Users
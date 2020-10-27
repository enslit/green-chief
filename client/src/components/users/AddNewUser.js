import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid"
import {Typography} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {setAppTitle} from "../../redux/actions/appActions"

function AddNewUser() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAppTitle('Новый пользователь'))
	}, [dispatch])

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<form>
					<Typography variant={'h5'} component={'h3'}>Создать нового пользователя</Typography>
				</form>
			</Grid>
		</Grid>
	);
}

export default AddNewUser;
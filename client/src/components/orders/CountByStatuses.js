import React from 'react';
import {useSelector} from "react-redux"
import {countOrdersByStatusSelector, countOrdersSelector} from "../../redux/selectors/selectors"
import {Grid, List, Typography} from "@material-ui/core"
import CountByStatus from "./CountByStatus"

function CountByStatuses() {
	const total = useSelector(state => countOrdersSelector(state))
	const byStatus = useSelector(state => countOrdersByStatusSelector(state))

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant={"body1"} component={'p'}>
					Счетчик использований купона: {total}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<List component={"ul"}>
					{
						Object.entries(byStatus)
							.map(([key, val]) => <CountByStatus key={key} status={key} count={val} />)
					}
				</List>
			</Grid>
		</Grid>
	);
}

export default CountByStatuses;
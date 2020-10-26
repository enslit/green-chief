import React from 'react'
import {makeStyles} from "@material-ui/styles"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import OrderTableRow from "./OrderTableRow"
import {Grid, Typography} from "@material-ui/core"

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
})

const OrdersTable = props => {
	const classes = useStyles()
	const withGoods = props.withGoods ?? false

	return (
		<Grid item xs={12}>
			<TableContainer component={Paper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							{ withGoods ?? <TableCell /> }
							<TableCell>Номер</TableCell>
							<TableCell>Покупатель</TableCell>
							<TableCell>Дата</TableCell>
							<TableCell>Сумма</TableCell>
							<TableCell>Статус</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.rows.length > 0
								? props.rows.map(row => <OrderTableRow key={row.id} row={row} goods={withGoods} />)
								: <TableRow aria-colspan={5}><TableCell><Typography variant={"subtitle1"} component={'h3'}>Заказов пока нет</Typography> </TableCell></TableRow>
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	)
}

export default OrdersTable
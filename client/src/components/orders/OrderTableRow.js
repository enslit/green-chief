import React, {useState} from 'react'
import {makeStyles} from "@material-ui/styles"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import OrderDetails from "./OrderDetails"
import CollapseButton from "./CollapseButton"
import useTranslateStatus from "../../hooks/useTranslateStatus"

const classes = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
})

export default function OrderTableRow({row, goods}) {
	const [open, setOpen] = useState(false)
	const translateStatus = useTranslateStatus()
	const {status, color} = translateStatus(row.status)

	let dateCreated = null;
	if (row.date_created.date) {
		dateCreated = new Date(row.date_created.date).toLocaleString()
	} else if (row.date_created) {
		dateCreated = new Date(row.date_created).toLocaleString()
	}

	return (
		<>
			<TableRow data-id={row.id} className={classes.root}>
				{ goods ?? <CollapseButton open={open} setOpen={setOpen} />}
				<TableCell>{row.id}</TableCell>
				<TableCell component="th" scope="row">
					{row.billing.first_name} {row.billing.last_name}
				</TableCell>
				<TableCell>{dateCreated}</TableCell>
				<TableCell>{row.total}</TableCell>
				<TableCell style={{color}}>{status}</TableCell>
			</TableRow>
			{ goods ?? <OrderDetails row={row} open={open}/> }
		</>
	)
}
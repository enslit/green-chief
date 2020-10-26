import React, {useState} from 'react';
import {TableCell, TableRow} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import Collapse from "@material-ui/core/Collapse"

const CouponOwner = ({owner}) => (
	<>
		{
			owner
				? <>
						{owner.name}
						<Typography variant={"body2"} component={'em'} style={{marginLeft: '15px'}}>
							{owner.email}
						</Typography>
					</>
				: 'Владелец не указан'
		}
	</>
)

function CouponTableRow({coupon}) {
	const [open, setOpen] = useState(false)
	const owner = coupon.owner ?? 'Без владельца'

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{coupon.code}</TableCell>
				<TableCell>
					<CouponOwner owner={owner} />
				</TableCell>
				<TableCell>{coupon.orders.length}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="h6" gutterBottom component="div">
								Список заказов
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>###</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{coupon.orders.map(order => (
										<TableRow key={order}>
											<TableCell component="th" scope="row">
												{order}
											</TableCell>
											<TableCell>###</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default CouponTableRow;
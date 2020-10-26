import React from 'react';
import TableCell from "@material-ui/core/TableCell"
import Collapse from "@material-ui/core/Collapse"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"

function OrderDetails(props) {
	return (
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
				<Collapse in={props.open} timeout="auto" unmountOnExit>
					<Box margin={1}>
						<Typography variant="h6" gutterBottom component="div">
							Детали заказа
						</Typography>
						<Table size="small" aria-label="purchases">
							<TableHead>
								<TableRow>
									<TableCell>Товар</TableCell>
									<TableCell>Количество</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.row.line_items.map(itemRow => (
									<TableRow key={itemRow.id}>
										<TableCell component="th" scope="row">
											{itemRow.name}
										</TableCell>
										<TableCell>{itemRow.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	);
}

export default OrderDetails;
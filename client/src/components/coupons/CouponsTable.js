import React from 'react'
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import {makeStyles} from "@material-ui/styles"

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
})

const CouponsTable = ({ coupons }) => {
	const classes = useStyles()

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{/*<TableCell />*/}
						<TableCell>Код купона</TableCell>
						{/*<TableCell>Владелец</TableCell>*/}
						{/*<TableCell>Количество заказов</TableCell>*/}
					</TableRow>
				</TableHead>
				<TableBody>
					{coupons.map(coupon => {
						return (
							<TableRow key={coupon.id}>
								<TableCell>
									{coupon.code}
								</TableCell>
							</TableRow>
						)
					})}
					{/*{ coupons.map(coupon => <CouponTableRow key={coupon._id} coupon={coupon} />) }*/}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default CouponsTable
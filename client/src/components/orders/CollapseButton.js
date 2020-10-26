import React from 'react';
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import TableCell from "@material-ui/core/TableCell"

function CollapseButton(props) {
	return (
		<TableCell>
			<IconButton aria-label="expand row" size="small" onClick={() => props.setOpen(!props.open)}>
				{props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</IconButton>
		</TableCell>
	);
}

export default CollapseButton;
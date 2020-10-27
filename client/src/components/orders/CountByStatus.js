import React from 'react';
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import useTranslateStatus from "../../hooks/useTranslateStatus"

function CountByStatus(props) {
	const translateStatus = useTranslateStatus()
	const {status, color} = translateStatus(props.status)

	return (
		<ListItem dense component={'li'}>
			<ListItemText style={{color: color}}>{status}: {props.count}</ListItemText>
		</ListItem>
	);
}

export default CountByStatus;
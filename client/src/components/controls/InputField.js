import React from 'react';
import TextField from "@material-ui/core/TextField"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
	wrapper: {
		marginTop: theme.spacing(2)
	}
}))

function InputField(props) {
	const {input, label, type, variant, meta: {touched, error}} = props
	const classes = useStyles()
	return (
		<div className={classes.wrapper}>
			<TextField
				{...input}
				fullWidth
				variant={variant}
				label={label}
				type={type}
				error={touched && !!error}
				// size={'small'}
				helperText={touched ? error : null}
				FormHelperTextProps={{
					error: true
				}}
			/>
		</div>
	);
}

export default InputField;
import React from "react"
import {Checkbox, FormControlLabel} from "@material-ui/core"

function CheckboxField({input, label}) {
	return (
		<FormControlLabel
			control={<Checkbox value="rememberMe" color="primary" />}
			{...input}
			label={label}
		/>
	);
}

export default CheckboxField;
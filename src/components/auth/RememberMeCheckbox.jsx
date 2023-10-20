import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const RememberMeCheckbox = ({ children, ...rest }) => {
	return (
		<FormGroup>
			<FormControlLabel control={<Checkbox {...rest} />} label="記住我" />
		</FormGroup>
	);
};

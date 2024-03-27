import { FormControlLabel, styled } from "@mui/material";

const FormControlLabelEx = styled(FormControlLabel, {
	// self props
	shouldForwardProp: (prop) =>
		!`nowrap`
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(({ theme, nowrap }) => ({
	...(nowrap && {
		whiteSpace: "nowrap",
	}),
}));

export default FormControlLabelEx;

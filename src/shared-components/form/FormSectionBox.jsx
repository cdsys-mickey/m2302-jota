import { Box } from "@mui/material";
import PropTypes from "prop-types";

const FormSectionBox = (props) => {
	const { p = 1, mb = 1, sx = [], bgcolor = "rgba(255, 255, 255, 100.0)",
		borderColor = "rgb(16 160 215)", ...rest } = props;
	return (
		<Box p={p} pt={1.5} mb={mb} sx={[
			(theme) => ({
				backgroundColor: bgcolor,
				borderRadius: theme.spacing(1),
				// borderBottom: `1px solid ${borderColor}`,
				borderLeft: `5px solid ${borderColor}`,
				boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 6px",
			}),
			...(Array.isArray(sx) ? sx : [sx]),
		]} {...rest}></Box>
	);
}

FormSectionBox.propTypes = {
	bgcolor: PropTypes.string,
	borderColor: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

FormSectionBox.displayName = "FormSectionBox";
export default FormSectionBox;
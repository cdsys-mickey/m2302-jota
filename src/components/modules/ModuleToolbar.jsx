import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ModuleToolbar = memo((props) => {
	const { children, ...rest } = props;
	return (
		<Box
			sx={{
				"& button": {
					marginLeft: "4px",
				},
			}}
			{...rest}>
			{children}
		</Box>
	);
});

ModuleToolbar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

ModuleToolbar.displayName = "ModuleToolbar";
export default ModuleToolbar;

import { useMediaQuery, useTheme } from "@mui/material";
import PropTypes from "prop-types";

export const useResponsive = (props = {}) => {
	const theme = useTheme();
	const { breakpoint = "md" } = props;
	const mobile = useMediaQuery(theme.breakpoints.down(breakpoint));

	return {
		mobile,
	};
};

useResponsive.propTypes = {
	breakpoint: PropTypes.oneOf(["md", "lg"]),
};

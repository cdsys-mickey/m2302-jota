import { useMediaQuery, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { createContext } from "react";
import { ResponsiveContext } from "./ResponsiveContext";

export const ResponsiveProvider = (props) => {
	const theme = useTheme();
	const { breakpoint = "md", children } = props;
	const mobile = useMediaQuery(theme.breakpoints.down(breakpoint));

	return (
		<ResponsiveContext.Provider
			value={{
				mobile,
			}}>
			{children}
		</ResponsiveContext.Provider>
	);
};

ResponsiveProvider.propTypes = {
	breakpoint: PropTypes.oneOf(["md", "lg"]),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

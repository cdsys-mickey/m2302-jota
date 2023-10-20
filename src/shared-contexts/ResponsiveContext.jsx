import { useMediaQuery, useTheme } from "@mui/material";
import { createContext, useContext } from "react";

export const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ breakpoint = "md", children }) => {
	const theme = useTheme();
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

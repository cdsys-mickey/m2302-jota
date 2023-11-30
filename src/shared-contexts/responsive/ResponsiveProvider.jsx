import PropTypes from "prop-types";
import { useResponsive } from "@/shared-hooks/responsive/useResponsive";
import { ResponsiveContext } from "./ResponsiveContext";

export const ResponsiveProvider = (props) => {
	const { children } = props;
	const responsive = useResponsive();

	return (
		<ResponsiveContext.Provider
			value={{
				...responsive,
			}}>
			{children}
		</ResponsiveContext.Provider>
	);
};

ResponsiveProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

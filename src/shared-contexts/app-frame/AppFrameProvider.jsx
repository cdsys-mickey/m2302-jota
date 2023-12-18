import PropTypes from "prop-types";
import { AppFrameContext } from "./AppFrameContext";
import { useAppFrame } from "./useAppFrame";

const AppFrameProvider = (props) => {
	const { children, drawerWidth } = props;
	const appFrame = useAppFrame({ drawerWidth });

	return (
		<AppFrameContext.Provider
			value={{
				...appFrame,
			}}>
			{children}
		</AppFrameContext.Provider>
	);
};

AppFrameProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	drawerWidth: PropTypes.number,
};

export default AppFrameProvider;

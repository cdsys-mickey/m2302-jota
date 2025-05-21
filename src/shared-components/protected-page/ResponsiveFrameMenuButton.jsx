import { Slide } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { FrameMenuButtonView } from "../FrameMenuButton/FrameMenuButtonView";

const ResponsiveFrameMenuButton = memo(
	forwardRef((props, ref) => {
		// const theme = useTheme();
		const { visible, onClick, ...rest } = props;

		return (
			<Slide direction="right" in={visible} mountOnEnter unmountOnExit>
				<FrameMenuButtonView ref={ref} onClick={onClick} {...rest} />
			</Slide>
		);
	})
);
ResponsiveFrameMenuButton.propTypes = {
	visible: PropTypes.bool,
	handleToggleDrawerOpen: PropTypes.func,
	onClick: PropTypes.func,
};
export default ResponsiveFrameMenuButton;

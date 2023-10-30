import { useMemo } from "react";
import FrameMenuItemButton from "./FrameMenuItemButton";
import useAppFrame from "@/shared-contexts/useAppFrame";
import PropTypes from "prop-types";

const FrameMenuItemButtonContainer = (props) => {
	const { code, ...rest } = props;
	const { handleMenuItemClickBy, menuItemSelected } = useAppFrame();

	const selected = useMemo(() => {
		return menuItemSelected === code;
	}, [code, menuItemSelected]);

	return (
		<FrameMenuItemButton
			code={code}
			handleClickBy={handleMenuItemClickBy}
			selected={selected}
			{...rest}
		/>
	);
};

FrameMenuItemButtonContainer.displayName = "FrameMenuItemButtonContainer";
FrameMenuItemButtonContainer.propTypes = {
	code: PropTypes.string.isRequired,
};
export default FrameMenuItemButtonContainer;

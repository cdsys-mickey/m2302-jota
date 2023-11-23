import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import FrameMenuItemButton from "./FrameMenuItemButton";

const FrameMenuItemButtonContainer = (props) => {
	const { value, ...rest } = props;
	const { handleMenuItemClickBy, menuItemSelected } =
		useContext(AppFrameContext);

	const selected = useMemo(() => {
		return menuItemSelected?.JobID === value.JobID;
	}, [menuItemSelected, value.JobID]);

	return (
		<FrameMenuItemButton
			value={value}
			handleClickBy={handleMenuItemClickBy}
			selected={selected}
			disabled={!value.WebName}
			{...rest}
		/>
	);
};

FrameMenuItemButtonContainer.displayName = "FrameMenuItemButtonContainer";
FrameMenuItemButtonContainer.propTypes = {
	value: PropTypes.object.isRequired,
};
export default FrameMenuItemButtonContainer;

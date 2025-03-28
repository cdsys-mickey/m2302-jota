import ResponsiveLoadingButton from "@/shared-components/ResponsiveLoadingButton/ResponsiveLoadingButtonContainer";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PropTypes from "prop-types";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuRemoveAllFieldsButtonContainer = (props) => {
	const { children = "移除所有功能", ...rest } = props;
	const jobMenu = useContext(JobMenuContext);
	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="neutral"
			endIcon={<KeyboardDoubleArrowLeftIcon />}
			onClick={jobMenu.handleRemoveAllFields}
			{...rest}>
			{children}
		</ResponsiveLoadingButton>
	);
};
JobMenuRemoveAllFieldsButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
JobMenuRemoveAllFieldsButtonContainer.displayName =
	"JobMenuRemoveAllFieldsButtonContainer";

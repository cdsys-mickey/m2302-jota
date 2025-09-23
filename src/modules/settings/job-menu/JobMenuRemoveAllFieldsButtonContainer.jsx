import { ButtonEx } from "@/shared-components";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import PropTypes from "prop-types";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuRemoveAllFieldsButtonContainer = (props) => {
	const { children = "移除所有功能", ...rest } = props;
	const jobMenu = useContext(JobMenuContext);
	return (
		<ButtonEx
			responsive
			variant="contained"
			color="neutral"
			endIcon={<KeyboardDoubleArrowLeftIcon />}
			onClick={jobMenu.handleRemoveAllFields}
			{...rest}>
			{children}
		</ButtonEx>
	);
};
JobMenuRemoveAllFieldsButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
JobMenuRemoveAllFieldsButtonContainer.displayName =
	"JobMenuRemoveAllFieldsButtonContainer";

import { ButtonEx } from "@/shared-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";
import PropTypes from "prop-types";

export const JobMenuAddAllFieldsButtonContainer = (props) => {
	const { children = "加入所有功能", ...rest } = props;
	const jobMenu = useContext(JobMenuContext);
	return (
		<ButtonEx
			responsive
			variant="contained"
			color="neutral"
			startIcon={<KeyboardDoubleArrowRightIcon />}
			onClick={jobMenu.handleAddAllFields}
			{...rest}>
			{children}
		</ButtonEx>
	);
};
JobMenuAddAllFieldsButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}
JobMenuAddAllFieldsButtonContainer.displayName =
	"JobMenuAddAllFieldsButtonContainer";

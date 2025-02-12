import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";
import PropTypes from "prop-types";

export const JobMenuAddGroupButtonContainer = (props) => {
	const { children = "新增群組標頭", ...rest } = props;
	const jobMenu = useContext(JobMenuContext);
	return (
		<ButtonWrapper
			responsive
			variant="contained"
			color="info"
			startIcon={<CreateNewFolderIcon />}
			onClick={jobMenu.handleAddGroup}
			{...rest}>
			{children}
		</ButtonWrapper>
	);
};
JobMenuAddGroupButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}
JobMenuAddGroupButtonContainer.displayName =
	"JobMenuAddGroupButtonContainer";

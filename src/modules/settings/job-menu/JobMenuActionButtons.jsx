import { JobMenuAddAllFieldsButtonContainer } from "./JobMenuAddAllFieldsButtonContainer";
import { JobMenuRemoveAllFieldsButtonContainer } from "./JobMenuRemoveAllFieldsButtonContainer";

const JobMenuActionButtons = () => {
	return (
		<>
			<JobMenuRemoveAllFieldsButtonContainer />
			<JobMenuAddAllFieldsButtonContainer />
		</>
	);
};

JobMenuActionButtons.propTypes = {};

JobMenuActionButtons.displayName = "JobMenuActionButtons";
export default JobMenuActionButtons;

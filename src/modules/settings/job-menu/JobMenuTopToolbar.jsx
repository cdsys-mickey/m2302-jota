import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import JobMenuActionButtons from "./JobMenuActionButtons";
import { JobMenuSaveButtonContainer } from "./JobMenuSaveButtonContainer";
import Colors from "@/modules/Colors.mjs";
import { JobMenuAddGroupButtonContainer } from "./JobMenuAddGroupButtonContainer";
import { JobMenuAddAllFieldsButtonContainer } from "./JobMenuAddAllFieldsButtonContainer";

const LeftComponent = () => {
	return (
		<>
			<JobMenuAddAllFieldsButtonContainer />
		</>
	)
}

const RightComponent = () => {
	return (
		<>
			<JobMenuAddGroupButtonContainer />
		</>
	)
}

const JobMenuTopToolbar = (props) => {
	const { ...rest } = props;
	return (
		<ToolbarEx
			bgcolor={Colors.TOOLBAR}
			LeftComponent={LeftComponent}

			RightComponent={RightComponent}
			{...rest} />
	);
}

JobMenuTopToolbar.propTypes = {

}

JobMenuTopToolbar.displayName = "JobMenuTopToolbar";
export default JobMenuTopToolbar;
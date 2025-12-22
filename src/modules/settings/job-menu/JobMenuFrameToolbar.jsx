import Colors from "@/modules/Colors.mjs";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { JobMenuRemoveAllFieldsButtonContainer } from "./JobMenuRemoveAllFieldsButtonContainer";
import { JobMenuSaveButtonContainer } from "./JobMenuSaveButtonContainer";

const LeftComponent = () => {
	return <JobMenuRemoveAllFieldsButtonContainer />
}

const RightComponent = () => {
	return (
		<>
			<JobMenuSaveButtonContainer />
		</>
	)
}

const JobMenuFrameToolbar = (props) => {
	const { ...rest } = props;
	return (
		<ToolbarEx
			bgcolor={Colors.TOOLBAR}
			LeftComponent={LeftComponent}

			RightComponent={RightComponent}
			{...rest} />
	);
}

JobMenuFrameToolbar.propTypes = {

}

JobMenuFrameToolbar.displayName = "JobMenuFrameToolbar";
export default JobMenuFrameToolbar;
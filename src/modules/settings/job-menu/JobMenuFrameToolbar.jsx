import Colors from "@/modules/md-colors";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
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
		<FlexToolbar
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
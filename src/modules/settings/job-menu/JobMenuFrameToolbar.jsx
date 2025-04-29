import Colors from "@/modules/Colors.mjs";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
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
		<ListToolbar
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
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import JobMenuActionButtons from "./JobMenuActionButtons";
import { JobMenuSaveButtonContainer } from "./JobMenuSaveButtonContainer";
import Colors from "@/modules/md-colors";
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
		<ListToolbar
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
import { useCallback, useContext } from "react";
import JobMenu from "./JobMenu.mjs";
import JobMenuAuthItems from "./JobMenuAuthItems";
import { JobMenuContext } from "./JobMenuContext";

const JobMenuAuthItemsContainer = (props) => {
	const jobMenu = useContext(JobMenuContext);
	const { ...rest } = props;

	const isAdded = useCallback((item) => {
		return jobMenu.selectedFields.some(x => x.JobID === item.JobID);
	}, [jobMenu.selectedFields]);

	return (

		<JobMenuAuthItems
			items={jobMenu.fields}
			isAdded={isAdded}
			droppableId={JobMenu.UNUSED}
			loading={jobMenu.fieldsLoading}
			onDelete={jobMenu.handleAdd}
			{...rest}
		/>
	);
};

JobMenuAuthItemsContainer.displayName = "JobMenuAuthItemsContainer";
export default JobMenuAuthItemsContainer;
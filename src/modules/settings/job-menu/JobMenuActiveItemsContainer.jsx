import { useContext } from "react";
import JobMenu from "./JobMenu.mjs";
import { JobMenuContext } from "./JobMenuContext";
import JobMenuActiveItems from "./JobMenuActiveItems";

export const JobMenuActiveItemsContainer = (props) => {
	const { ...rest } = props;
	const jobMenu = useContext(JobMenuContext);
	return (
		<JobMenuActiveItems
			items={jobMenu.selectedFields}
			droppableId={JobMenu.SELECTED}
			loading={jobMenu.menuLoading}
			onDelete={jobMenu.handleDelete}
			{...rest}
		/>
	);
};

JobMenuActiveItemsContainer.displayName = "JobMenuActiveItemsContainer";

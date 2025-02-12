import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";
import JobMenuForm from "./JobMenuForm";
import { useInit } from "@/shared-hooks/useInit";

export const JobMenuFormContainer = (props) => {
	const { ...rest } = props;
	const jobMenu = useContext(JobMenuContext);

	useInit(() => {
		jobMenu.loadDef();
	}, []);

	return (
		<JobMenuForm
			onDragEnd={jobMenu.handleDragEnd}
			{...rest}
		/>
	);
};

JobMenuFormContainer.displayName = "JobMenuFormContainer";

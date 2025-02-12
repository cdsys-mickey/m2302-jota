import ContainerEx from "@/shared-components/ContainerEx";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useMemo } from "react";
import { JobMenuFormContainer } from "./JobMenuFormContainer";
import JobMenuFrameToolbar from "./JobMenuFrameToolbar";
import { JobMenuProvider } from "./JobMenuProvider";
import JobMenuTopToolbar from "./JobMenuTopToolbar";

const JobMenuFrameContainer = () => {
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 280;
	}, [height])



	return (
		<JobMenuProvider>
			<ContainerEx maxWidth="sm" alignLeft>
				<JobMenuTopToolbar />
				<JobMenuFormContainer height={_height} />
				<JobMenuFrameToolbar />
			</ContainerEx>
		</JobMenuProvider>
	);
}

JobMenuFrameContainer.displayName = "JobMenuFrameContainer";
export default JobMenuFrameContainer;
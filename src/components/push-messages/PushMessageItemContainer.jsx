import usePushMessages from "@/contexts/usePushMessages";

import { forwardRef, useCallback } from "react";
import PushMessageItem from "./PushMessageItem";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

export const PushMessageItemContainer = forwardRef((props, ref) => {
	const { job, ...rest } = props;
	const { handleSelectJob } = useContext(AppFrameContext);
	const { handlePopoverClose } = usePushMessages();

	const handleJobClick = useCallback(() => {
		handlePopoverClose();
		handleSelectJob(job);
	}, [handlePopoverClose, handleSelectJob, job]);

	return (
		<PushMessageItem
			ref={ref}
			job={job}
			onJobClick={handleJobClick}
			{...rest}
		/>
	);
});

PushMessageItemContainer.displayName = "PushMessageItemContainer";

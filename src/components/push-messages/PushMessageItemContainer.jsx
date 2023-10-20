import { usePushMessages } from "@/contexts/PushMessagesContext";

import { forwardRef, useCallback } from "react";
import PushMessageItem from "./PushMessageItem";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";

export const PushMessageItemContainer = forwardRef((props, ref) => {
	const { job, ...rest } = props;
	const { handleSelectJob } = useProtectedLayout();
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

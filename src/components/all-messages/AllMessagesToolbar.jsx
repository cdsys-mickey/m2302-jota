import { forwardRef, memo } from "react";

import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import ModuleToolbar from "../jobs/ModuleToolbar";
import { AllMessagesFetchResultLabelContainer } from "./AllMessagesFetchResultLabelContainer";


const LeftButtons = memo(() => {
	return <ModuleToolbar></ModuleToolbar>;
});

LeftButtons.displayName = "LeftButtons";

const AllMessagesToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={AllMessagesFetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

AllMessagesToolbar.displayName = "MsgToolbar";
export default AllMessagesToolbar;

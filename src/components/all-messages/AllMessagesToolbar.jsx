import { forwardRef, memo } from "react";

import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import ModuleToolbar from "../jobs/ModuleToolbar";
import { AllMessagesFetchResultLabelContainer } from "./AllMessagesFetchResultLabelContainer";


const LeftButtons = memo(() => {
	return <ModuleToolbar></ModuleToolbar>;
});

LeftButtons.displayName = "LeftButtons";

const AllMessagesToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
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

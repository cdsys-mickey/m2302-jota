import { forwardRef, memo } from "react";

import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";
import ModuleToolbar from "../jobs/ModuleToolbar";
import { MsgFetchResultLabelContainer } from "./MsgFetchResultLabelContainer";


const LeftButtons = memo(() => {
	return <ModuleToolbar></ModuleToolbar>;
});

LeftButtons.displayName = "LeftButtons";

const MsgToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={MsgFetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

MsgToolbar.displayName = "MsgToolbar";
export default MsgToolbar;

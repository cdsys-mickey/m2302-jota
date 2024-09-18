import { forwardRef, memo } from "react";

import FlexToolbar from "../../shared-components/listview/toolbar/FlexToolbar";
import ModuleToolbar from "../jobs/ModuleToolbar";
import { MsgFetchResultLabelContainer } from "./MsgFetchResultLabelContainer";


const LeftButtons = memo(() => {
	return <ModuleToolbar></ModuleToolbar>;
});

LeftButtons.displayName = "LeftButtons";

const MsgToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
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

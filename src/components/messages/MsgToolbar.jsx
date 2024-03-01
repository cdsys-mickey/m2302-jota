import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";

import { MsgFetchResultLabelContainer } from "./MsgFetchResultLabelContainer";
import ModuleToolbar from "../modules/ModuleToolbar";

const LeftButtons = memo(() => {
	return <ModuleToolbar>{/* <ZA03CreateButtonContainer /> */}</ModuleToolbar>;
});

LeftButtons.displayName = "LeftButtons";

const ZA03Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<InlineListViewToolbar
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

ZA03Toolbar.displayName = "ZA03ListViewToolbar";
export default ZA03Toolbar;

import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ModuleToolbar from "../ModuleToolbar";
import ZA03CreateButtonContainer from "./ZA03CreateButtonContainer";
import { ZA03FetchResultLabelContainer } from "./ZA03FetchResultLabelContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<ZA03CreateButtonContainer />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const ZA03Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={ZA03FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

ZA03Toolbar.displayName = "ZA03ListViewToolbar";
export default ZA03Toolbar;
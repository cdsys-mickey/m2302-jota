import { forwardRef, memo } from "react";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import ZA03CreateButtonContainer from "./ZA03CreateButtonContainer";
import { ZA03FetchResultLabelContainer } from "./ZA03FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<ZA03CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const ZA03Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				alignItems="flex-end"
				pr={1}
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

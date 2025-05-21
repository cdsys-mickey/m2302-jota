import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import G06CreateButtonContainer from "./G06CreateButtonContainer";
import { G06FetchResultLabelContainer } from "./G06FetchResultLabelContainer";

const LeftButtons = memo(() => (
	<>
		{/* <G06CreateButtonContainer /> */}
	</>
))

LeftButtons.displayName = "LeftButtons";

const G06Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={G06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

G06Toolbar.displayName = "G06ListViewToolbar";
export default G06Toolbar;


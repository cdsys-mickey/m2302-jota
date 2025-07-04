import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import P41CreateButtonContainer from "./P41CreateButtonContainer";
import { P41FetchResultLabelContainer } from "./P41FetchResultLabelContainer";
import P41PrintButtonContainer from "./P41PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P41CreateButtonContainer />
		<P41PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const P41Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P41FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P41Toolbar.displayName = "P41ListViewToolbar";
export default P41Toolbar;




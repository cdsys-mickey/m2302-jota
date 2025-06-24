import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import P42CreateButtonContainer from "./P42CreateButtonContainer";
import { P42FetchResultLabelContainer } from "./P42FetchResultLabelContainer";
import P42PrintButtonContainer from "./P42PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P42CreateButtonContainer />
		<P42PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const P42Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P42FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P42Toolbar.displayName = "P42ListViewToolbar";
export default P42Toolbar;




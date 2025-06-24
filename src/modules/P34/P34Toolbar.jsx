import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import P34CreateButtonContainer from "./P34CreateButtonContainer";
import { P34FetchResultLabelContainer } from "./P34FetchResultLabelContainer";
import P34PrintButtonContainer from "./P34PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P34CreateButtonContainer />
		<P34PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const P34Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P34FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P34Toolbar.displayName = "P34ListViewToolbar";
export default P34Toolbar;


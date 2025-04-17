import { forwardRef, memo } from "react";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";
import A16CreateButtonContainer from "./A16CreateButtonContainer";
import { A16FetchResultLabelContainer } from "./A16FetchResultLabelContainer";
import A16PrintButtonContainer from "./A16PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<A16CreateButtonContainer />
			<A16PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const A16Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A16FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A16Toolbar.displayName = "A16ListViewToolbar";
export default A16Toolbar;


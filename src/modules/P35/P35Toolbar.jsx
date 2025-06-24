import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import P35CreateButtonContainer from "./P35CreateButtonContainer";
import { P35FetchResultLabelContainer } from "./P35FetchResultLabelContainer";
import P35PrintButtonContainer from "./P35PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P35CreateButtonContainer />
		<P35PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const P35Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P35FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P35Toolbar.displayName = "P35ListViewToolbar";
export default P35Toolbar;



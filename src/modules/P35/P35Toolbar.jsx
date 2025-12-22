import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
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
			<ToolbarEx
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



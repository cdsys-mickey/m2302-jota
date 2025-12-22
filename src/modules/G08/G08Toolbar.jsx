import { forwardRef, memo } from "react";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";
import G08CreateButtonContainer from "./G08CreateButtonContainer";
import { G08FetchResultLabelContainer } from "./G08FetchResultLabelContainer";
import G08PrintButtonContainer from "./G08PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<G08CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const G08Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={G08FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

G08Toolbar.displayName = "G08ListViewToolbar";
export default G08Toolbar;



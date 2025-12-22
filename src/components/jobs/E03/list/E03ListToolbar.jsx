import { forwardRef, memo } from "react";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import ModuleToolbar from "../../ModuleToolbar";
import E03CreateButtonContainer from "../E03CreateButtonContainer";
import { E03FetchResultLabelContainer } from "../E03FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<E03CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const E03ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={E03FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

E03ListToolbar.displayName = "E03ListViewToolbar";
export default E03ListToolbar;





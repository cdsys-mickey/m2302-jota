import { forwardRef, memo } from "react";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import ModuleToolbar from "../../../components/jobs/ModuleToolbar";
import F01CreateButtonContainer from "../F01CreateButtonContainer";
import { F01FetchResultLabelContainer } from "../F01FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<F01CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const F01ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={F01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

F01ListToolbar.displayName = "F01ListViewToolbar";
export default F01ListToolbar;


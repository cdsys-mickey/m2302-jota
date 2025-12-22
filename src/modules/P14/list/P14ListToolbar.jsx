import { forwardRef, memo } from "react";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import ModuleToolbar from "../../../components/jobs/ModuleToolbar";
import P14CreateButtonContainer from "../P14CreateButtonContainer";
import { P14FetchResultLabelContainer } from "../P14FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<P14CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const P14ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={P14FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P14ListToolbar.displayName = "P14ListViewToolbar";
export default P14ListToolbar;



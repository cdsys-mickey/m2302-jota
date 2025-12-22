import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import { B04FetchResultLabelContainer } from "../B04FetchResultLabelContainer";
import { B04ListOutputModePickerContainer } from "./B04ListOutputModePickerContainer";
import B04ListPrintButtonContainer from "./B04ListPrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			{/* <B04CreateButtonContainer /> */}
			<B04ListOutputModePickerContainer />
			<B04ListPrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B04ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B04FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B04ListToolbar.displayName = "B04ListViewToolbar";
export default B04ListToolbar;




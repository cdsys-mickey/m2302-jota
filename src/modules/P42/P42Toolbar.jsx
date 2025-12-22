import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import P42CreateButtonContainer from "./P42CreateButtonContainer";
import { P42FetchResultLabelContainer } from "./P42FetchResultLabelContainer";

const LeftButtons = memo(() => (
	<>
		<P42CreateButtonContainer />
		{/* <P42PrintButtonContainer /> */}
	</>
))

LeftButtons.displayName = "LeftButtons";

const P42Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
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





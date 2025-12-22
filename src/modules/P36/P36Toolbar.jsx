import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import P36CreateButtonContainer from "./P36CreateButtonContainer";
import { P36FetchResultLabelContainer } from "./P36FetchResultLabelContainer";
import P36PrintButtonContainer from "./P36PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P36CreateButtonContainer />
		{/* <P36PrintButtonContainer /> */}
	</>
))

LeftButtons.displayName = "LeftButtons";

const P36Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P36FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P36Toolbar.displayName = "P36ListViewToolbar";
export default P36Toolbar;




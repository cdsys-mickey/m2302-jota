import { forwardRef, memo } from "react";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import ModuleToolbar from "../ModuleToolbar";
import B05CreateButtonContainer from "./B05CreateButtonContainer";
import { B05FetchResultLabelContainer } from "./B05FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<B05CreateButtonContainer />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const B05Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B05FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B05Toolbar.displayName = "B05ListViewToolbar";
export default B05Toolbar;

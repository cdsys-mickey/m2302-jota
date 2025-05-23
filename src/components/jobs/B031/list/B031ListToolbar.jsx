import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import B031CreateButtonContainer from "../B031CreateButtonContainer";
import { B031FetchResultLabelContainer } from "../B031FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B031CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B031ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B031FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B031ListToolbar.displayName = "B031ListViewToolbar";
export default B031ListToolbar;



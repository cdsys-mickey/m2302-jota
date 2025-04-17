import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import B012CreateButtonContainer from "../B012CreateButtonContainer";
import { B012FetchResultLabelContainer } from "../B012FetchResultLabelContainer";
import B012PrintButtonContainer from "../dialog/toolbar/B012PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B012CreateButtonContainer />
			<B012PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B012ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B012FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B012ListToolbar.displayName = "B012ListViewToolbar";
export default B012ListToolbar;



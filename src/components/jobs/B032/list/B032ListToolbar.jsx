import { forwardRef, memo } from "react";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import ModuleToolbar from "../../ModuleToolbar";
import B032CreateButtonContainer from "../B032CreateButtonContainer";
import { B032FetchResultLabelContainer } from "../B032FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B032CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B032ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B032FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B032ListToolbar.displayName = "B032ListViewToolbar";
export default B032ListToolbar;




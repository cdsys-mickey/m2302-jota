import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, memo } from "react";
import { B02FetchResultLabelContainer } from "../B02FetchResultLabelContainer";
import { B02ListOutputModePickerContainer } from "./B02ListOutputModePickerContainer";
import B02ListPrintButtonContainer from "./B02ListPrintButtonContainer";
import DebugDialogButtonContainer from "@/components/home/debug/DebugDialogButtonContainer";
import PropTypes from "prop-types";

const LeftButtons = memo(() => {
	return (
		<>
			<B02ListOutputModePickerContainer />
			<B02ListPrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B02ListToolbar = memo(
	forwardRef(({ onDebugSubmit, ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={() => (<>
					<B02ListOutputModePickerContainer />
					<B02ListPrintButtonContainer />
					<DebugDialogButtonContainer onClick={onDebugSubmit} />
				</>)}
				RightComponent={B02FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);
B02ListToolbar.propTypes = {
	onDebugSubmit: PropTypes.func
}
B02ListToolbar.displayName = "B02ListViewToolbar";
export default B02ListToolbar;



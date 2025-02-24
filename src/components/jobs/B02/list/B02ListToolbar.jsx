import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { B02FetchResultLabelContainer } from "../B02FetchResultLabelContainer";
import B02ExportButtonContainer from "./B02ExportButtonContainer";

{/* <>
	<B02ListOutputModePickerContainer />
	<B02ListPrintButtonContainer />
	</> */}
const LeftButtons = memo(() => (
	<B02ExportButtonContainer variant="contained" color="primary" />
));

LeftButtons.displayName = "LeftButtons";

const B02ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
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



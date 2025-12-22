import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D02CreateButtonContainer from "../D02CreateButtonContainer";
import { D02FetchResultLabelContainer } from "../D02FetchResultLabelContainer";
import D02ExpCheckingButtonContainer from "../D02ExpCheckingButtonContainer";
// import D02ListModePicker from "../D02ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D02CreateButtonContainer />
			{/* <D02ExpCheckingButtonContainer /> */}
			{/* <D02ListModePicker
				name="listMode"
				placeholder="篩選模式"
				disableClearable
				autoComplete
				autoSelect
			/> */}
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const D02ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D02FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D02ListToolbar.displayName = "D02ListViewToolbar";
D02ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D02ListToolbar;

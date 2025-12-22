import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D06CreateButtonContainer from "../D06CreateButtonContainer";
import { D06FetchResultLabelContainer } from "../D06FetchResultLabelContainer";
import D06ExpCheckingButtonContainer from "../D06ExpCheckingButtonContainer";
// import D06ListModePicker from "../D06ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D06CreateButtonContainer />
			{/* <D06ExpCheckingButtonContainer /> */}
			{/* <D06ListModePicker
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

const D06ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D06ListToolbar.displayName = "D06ListViewToolbar";
D06ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D06ListToolbar;


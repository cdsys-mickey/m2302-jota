import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D041CreateButtonContainer from "../D041CreateButtonContainer";
import { D041FetchResultLabelContainer } from "../D041FetchResultLabelContainer";
import D041ExpCheckingButtonContainer from "../D041ExpCheckingButtonContainer";
// import D041ListModePicker from "../D041ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D041CreateButtonContainer />
			<D041ExpCheckingButtonContainer />
			{/* <D041ListModePicker
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

const D041ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D041FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D041ListToolbar.displayName = "D041ListViewToolbar";
D041ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D041ListToolbar;

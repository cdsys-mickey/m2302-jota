import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { F03FetchResultLabelContainer } from "../F03FetchResultLabelContainer";
// import F03ListModePicker from "../F03ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			{/* <F03CreateButtonContainer /> */}
			{/* <F03ExpCheckingButtonContainer /> */}
			{/* <F03ListModePicker
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

const F03ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={F03FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

F03ListToolbar.displayName = "F03ListViewToolbar";
F03ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default F03ListToolbar;




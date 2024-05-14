import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C04CreateButtonContainer from "../C04CreateButtonContainer";
import { C04FetchResultLabelContainer } from "../C04FetchResultLabelContainer";
import C04ListModePicker from "../C04ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C04CreateButtonContainer />
			{/* <C04ListModePicker
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

const C04ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C04FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C04ListToolbar.displayName = "C04ListViewToolbar";
C04ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C04ListToolbar;

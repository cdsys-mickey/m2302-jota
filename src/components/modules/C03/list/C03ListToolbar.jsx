import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "../../../../shared-components/LoadingTypography";
import C03CreateButtonContainer from "../C03CreateButtonContainer";
import { C03FetchResultLabelContainer } from "../C03FetchResultLabelContainer";
import C03ListModePicker from "../C03ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C03CreateButtonContainer />
			<C03ListModePicker
				name="listMode"
				placeholder="篩選模式"
				disableClearable
				autoComplete
				autoSelect
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C03ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
				pb={1}
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C03FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C03ListToolbar.displayName = "C03ListViewToolbar";
C03ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C03ListToolbar;

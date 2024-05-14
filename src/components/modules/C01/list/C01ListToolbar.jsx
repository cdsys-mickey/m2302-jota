import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "../../../../shared-components/LoadingTypography";
import { C01FetchResultLabelContainer } from "../C01FetchResultLabelContainer";
import C01ListModePicker from "../C01ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C01ListModePicker
				name="listMode"
				placeholder="篩選模式"
				disableClearable
				autoComplete
				autoSelect
				blurOnSelect
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C01ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C01ListToolbar.displayName = "C01ListViewToolbar";
C01ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C01ListToolbar;

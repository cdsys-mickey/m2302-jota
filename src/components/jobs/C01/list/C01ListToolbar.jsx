import { FlexBox } from "shared-components";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { C01FetchResultLabelContainer } from "../C01FetchResultLabelContainer";
import C01ListModePicker from "../C01ListModePicker";
import { C01TransformButtonContainer } from "./C01TransformButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<C01TransformButtonContainer variant="contained" />
			<C01ListModePicker
				dense
				name="listMode"
				placeholder="篩選模式"
				// disableClearable
				autoComplete
				autoSelect
				blurOnSelect
				width="12rem"
				disableOpenOnInput
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C01ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
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

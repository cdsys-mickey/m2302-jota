import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import B06ExportButtonContainer from "./B06ExportButtonContainer";
import { B06FetchResultLabelContainer } from "./B06FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<B06ExportButtonContainer
			variant="contained"
			color="primary"
		/>
		// <>
		// 	<B06PrintButtonContainer />
		// 	<B06OutputModePickerContainer
		// 		disableClearable
		// 		autoComplete
		// 		autoSelect
		// 	/>
		// </>
	);
});

LeftButtons.displayName = "LeftButtons";

const B06Toolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				alignItems="flex-end"
				pl={0}
				pr={1}
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={B06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B06Toolbar.displayName = "B06ListViewToolbar";
B06Toolbar.propTypes = {
	loading: PropTypes.bool,
};
export default B06Toolbar;

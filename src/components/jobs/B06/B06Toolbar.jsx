import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { B06FetchResultLabelContainer } from "./B06FetchResultLabelContainer";
import { B06OutputModePickerContainer } from "./B06OutputModePickerContainer";
import B06PrintButtonContainer from "./B06PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B06PrintButtonContainer />
			<B06OutputModePickerContainer
				disableClearable
				autoComplete
				autoSelect
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B06Toolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
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

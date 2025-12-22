import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C06CreateButtonContainer from "../C06CreateButtonContainer";
import { C06FetchResultLabelContainer } from "../C06FetchResultLabelContainer";
// import C06ListModePicker from "../C06ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C06CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C06ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C06ListToolbar.displayName = "C06ListViewToolbar";
C06ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C06ListToolbar;

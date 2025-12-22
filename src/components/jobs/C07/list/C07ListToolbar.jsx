import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C07CreateButtonContainer from "../C07CreateButtonContainer";
import { C07FetchResultLabelContainer } from "../C07FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<C07CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C07ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ToolbarEx
				pl={0}
				alignItems="flex-end"
				ref={ref}
				// LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C07FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C07ListToolbar.displayName = "C07ListViewToolbar";
C07ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C07ListToolbar;

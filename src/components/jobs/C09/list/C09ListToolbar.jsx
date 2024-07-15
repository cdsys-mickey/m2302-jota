import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C09CreateButtonContainer from "../C09CreateButtonContainer";
import { C09FetchResultLabelContainer } from "../C09FetchResultLabelContainer";
// import C09ListModePicker from "../C09ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C09CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C09ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<FlexToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C09FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C09ListToolbar.displayName = "C09ListViewToolbar";
C09ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C09ListToolbar;

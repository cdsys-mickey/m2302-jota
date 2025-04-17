import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C05CreateButtonContainer from "../C05CreateButtonContainer";
import { C05FetchResultLabelContainer } from "../C05FetchResultLabelContainer";
// import C05ListModePicker from "../C05ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C05CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C05ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C05FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C05ListToolbar.displayName = "C05ListViewToolbar";
C05ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C05ListToolbar;

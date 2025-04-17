import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D05CreateButtonContainer from "../D05CreateButtonContainer";
import { D05FetchResultLabelContainer } from "../D05FetchResultLabelContainer";
// import D05ListModePicker from "../D05ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D05CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const D05ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D05FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D05ListToolbar.displayName = "D05ListViewToolbar";
D05ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D05ListToolbar;


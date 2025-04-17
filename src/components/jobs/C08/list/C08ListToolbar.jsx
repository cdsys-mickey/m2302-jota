import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C08CreateButtonContainer from "../C08CreateButtonContainer";
import { C08FetchResultLabelContainer } from "../C08FetchResultLabelContainer";
// import C08ListModePicker from "../C08ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C08CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C08ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C08FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C08ListToolbar.displayName = "C08ListViewToolbar";
C08ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C08ListToolbar;

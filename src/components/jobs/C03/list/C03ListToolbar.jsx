import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import C03CreateButtonContainer from "../C03CreateButtonContainer";
import { C03FetchResultLabelContainer } from "../C03FetchResultLabelContainer";
import C03ReviewModePicker from "../C03ReviewModePicker";
// import C03ListModePicker from "../C03ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<C03CreateButtonContainer />
			<C03ReviewModePicker
				name="lvReviewState"
				dense
				placeholder="覆核狀態"
				autoComplete
				autoSelect
				width="10rem"
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C03ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C03FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C03ListToolbar.displayName = "C03ListViewToolbar";
C03ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C03ListToolbar;

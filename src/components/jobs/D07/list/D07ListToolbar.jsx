import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D07CreateButtonContainer from "../D07CreateButtonContainer";
import { D07FetchResultLabelContainer } from "../D07FetchResultLabelContainer";
import D07ExpCheckingButtonContainer from "../D07ExpCheckingButtonContainer";
// import D07ListModePicker from "../D07ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D07CreateButtonContainer />
			{/* <D07ExpCheckingButtonContainer /> */}
			{/* <D07ListModePicker
				name="listMode"
				placeholder="篩選模式"
				disableClearable
				autoComplete
				autoSelect
			/> */}
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const D07ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D07FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D07ListToolbar.displayName = "D07ListViewToolbar";
D07ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D07ListToolbar;



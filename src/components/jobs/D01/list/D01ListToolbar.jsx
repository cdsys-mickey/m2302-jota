import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import D01CreateButtonContainer from "../D01CreateButtonContainer";
import { D01FetchResultLabelContainer } from "../D01FetchResultLabelContainer";
import D01ExpCheckingButtonContainer from "../D01ExpCheckingButtonContainer";
// import D01ListModePicker from "../D01ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>
			<D01CreateButtonContainer />
			<D01ExpCheckingButtonContainer />
			{/* <D01ListModePicker
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

const D01ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={D01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

D01ListToolbar.displayName = "D01ListViewToolbar";
D01ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default D01ListToolbar;


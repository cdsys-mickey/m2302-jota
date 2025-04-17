import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C02CreateButtonContainer from "../C02CreateButtonContainer";
import { C02FetchResultLabelContainer } from "../C02FetchResultLabelContainer";
import C02ListModePicker from "../C02ListModePicker";

const LeftButtons = memo(() => {
	return (
		<>

			<C02CreateButtonContainer />
			<C02ListModePicker
				name="listMode"
				placeholder="篩選模式"
				width="10rem"
				// disableClearable
				autoComplete
				autoSelect
			/>
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const C02ListToolbar = memo(
	forwardRef(({ loading, ...rest }, ref) => {
		return (
			<ListToolbar
				pl={0}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={loading ? LoadingTypography : LeftButtons}
				RightComponent={C02FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

C02ListToolbar.displayName = "C02ListViewToolbar";
C02ListToolbar.propTypes = {
	loading: PropTypes.bool,
};
export default C02ListToolbar;

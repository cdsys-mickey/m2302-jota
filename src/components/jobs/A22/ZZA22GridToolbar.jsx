import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A22GenReportButtonContainer } from "./A22GenReportButtonContainer";
import { A22GridCancelEditButtonContainer } from "./A22GridCancelEditButtonContainer";
import { A22GridLockRowsSwitchContainer } from "./A22GridLockRowsSwitchContainer";
import TxtExportOutputModePicker from "../txt-export/TxtExportOutputModePicker";
import TxtExport from "../../../modules/md-txt-export";
import { A22OutputModePickerContainer } from "./A22OutputModePickerContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const ZZA22GridToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListToolbar
				ref={ref}
				// RightComponent={A22GridLockRowsSwitchContainer}
				leftComponents={
					<>
						<A22GridLockRowsSwitchContainer />
					</>
				}
				rightComponents={
					<>
						<A22OutputModePickerContainer />
					</>
				}
				{...rest}
			/>
		);
	})
);

ZZA22GridToolbar.propTypes = {};

ZZA22GridToolbar.displayName = "A22GridToolbar";
export default ZZA22GridToolbar;

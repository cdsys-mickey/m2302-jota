import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { ProdGridLockRowsSwitchContainer } from "./ProdGridLockRowsSwitchContainer";
import { ProdGridSaveButtonContainer } from "./ProdGridSaveButtonContainer";
import { ProdGridCancelEditButtonContainer } from "./ProdGridCancelEditButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import Colors from "../../../modules/md-colors";
import { ProdGridEditButtonContainer } from "./ProdGridEditButtonContainer";
import { ProdGridCancelChangesButtonContainer } from "./ProdGridCancelChangesButtonContainer";

const ProdGridToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<FlexToolbar
				minHeight={38}
				bgcolor={Colors.TOOLBAR}
				ref={ref}
				// RightComponent={ProdGridLockRowsSwitchContainer}
				rightComponents={<></>}
				leftComponents={
					<>
						{/* <ProdGridLockRowsSwitchContainer /> */}
						<ProdGridEditButtonContainer variant="contained" />

						<ProdGridCancelEditButtonContainer
							variant="outlined"
							color="warning">
							離開
						</ProdGridCancelEditButtonContainer>

						<ProdGridSaveButtonContainer
							variant="contained"
							color="warning"
						/>
						<ProdGridCancelChangesButtonContainer
							variant="contained"
							color="error"
						/>
					</>
				}
				{...rest}
			/>
		);
	})
);

ProdGridToolbar.propTypes = {};

ProdGridToolbar.displayName = "ProdGridToolbar";
export default ProdGridToolbar;

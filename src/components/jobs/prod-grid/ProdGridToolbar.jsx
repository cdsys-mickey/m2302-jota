import { forwardRef, memo } from "react";
import Colors from "@/modules/md-colors";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { ProdGridCancelChangesButtonContainer } from "./ProdGridCancelChangesButtonContainer";
import { ProdGridCancelEditButtonContainer } from "./ProdGridCancelEditButtonContainer";
import { ProdGridEditButtonContainer } from "./ProdGridEditButtonContainer";
import { ProdGridSaveButtonContainer } from "./ProdGridSaveButtonContainer";

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
							結束編輯
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

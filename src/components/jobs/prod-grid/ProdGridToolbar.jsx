import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { ProdGridCancelChangesButtonContainer } from "./ProdGridCancelChangesButtonContainer";
import { ProdGridCancelEditButtonContainer } from "./ProdGridCancelEditButtonContainer";
import { ProdGridEditButtonContainer } from "./ProdGridEditButtonContainer";
import { ProdGridSaveButtonContainer } from "./ProdGridSaveButtonContainer";

const ProdGridToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<ListToolbar
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
							取消編輯
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

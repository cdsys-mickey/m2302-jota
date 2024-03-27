import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { ProdGridLockRowsSwitchContainer } from "./ProdGridLockRowsSwitchContainer";
import { ProdGridSaveButtonContainer } from "./ProdGridSaveButtonContainer";
import { ProdGridCancelEditButtonContainer } from "./ProdGridCancelEditButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const ProdGridToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<FlexToolbar
				ref={ref}
				// RightComponent={ProdGridLockRowsSwitchContainer}
				leftComponents={<></>}
				rightComponents={
					<>
						<ProdGridLockRowsSwitchContainer />
						<ProdGridSaveButtonContainer
							variant="contained"
							color="warning"
						/>
						<ProdGridCancelEditButtonContainer
							variant="contained"
							color="neutral"
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

import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { ProdGridLockRowsSwitchContainer } from "./ProdGridLockRowsSwitchContainer";
import { ProdGridSaveButtonContainer } from "./ProdGridSaveButtonContainer";
import { ProdGridCancelEditButtonContainer } from "./ProdGridCancelEditButtonContainer";

const ProdGridToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<InlineListViewToolbar
				ref={ref}
				// RightComponent={ProdGridLockRowsSwitchContainer}
				leftComponents={
					<>
						<ProdGridLockRowsSwitchContainer />
					</>
				}
				rightComponents={
					<>
						<ProdGridSaveButtonContainer />
						<ProdGridCancelEditButtonContainer />
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

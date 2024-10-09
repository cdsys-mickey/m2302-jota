import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useMemo } from "react";

export const ProdGridSaveButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	// const disabled = useMemo(() => {
	// 	return prodGrid.grid.dirtyIds.size === 0
	// }, [prodGrid.grid.dirtyIds.size])

	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0 ||
		prodGrid.readOnly
	) {
		return false;
	}

	return (
		<ResponsiveLoadingButton
			size="small"
			// disabled={disabled}
			disabled={!prodGrid.isDirty}
			// disabled={!prodGrid.dirty}
			endIcon={<SaveIcon />}
			loading={prodGrid.saveWorking}
			onClick={prodGrid.handleSave}
			{...rest}>
			儲存
		</ResponsiveLoadingButton>
	);
};

ProdGridSaveButtonContainer.displayName = "ProdGridSaveButtonContainer";

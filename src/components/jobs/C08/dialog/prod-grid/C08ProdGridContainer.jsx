import { useContext } from "react";
import C08ProdGrid from "./C08ProdGrid";
import { C08Context } from "@/contexts/C08/C08Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const C08ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c08 = useContext(C08Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const txiDept = useWatch({
		name: "txiDept",
		conrtol: form.control,
	});

	const handleGridChange = useMemo(() => {
		return c08.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c08, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<C08ProdGrid
				gridRef={c08.setGridRef}
				readOnly={!c08.editing || !txiDept}
				data={c08.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 356}
				getRowKey={c08.getRowKey}
				stypeDisabled={c08.stypeDisabled}
				getSPriceClassName={c08.getSPriceClassName}
				getSQtyClassName={c08.getSQtyClassName}
				sprodDisabled={c08.sprodDisabled}
				sqtyDisabled={c08.sqtyDisabled}
				dtypeDisabled={c08.dtypeDisabled}
				overrideSQtyDisabled={c08.overrideSQtyDisabled}
				// buildSelectionChangeHandler={c08.buildSelectionChangeHandler()}
				handleGridCellFocusChange={c08.handleGridCellFocusChange}
				getRowClassName={c08.getRowClassName}
				getTooltip={c08.getTooltip}
				createRow={c08.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

C08ProdGridContainer.displayName = "C08ProdGridContainer";

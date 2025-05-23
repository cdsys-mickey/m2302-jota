import { C02Context } from "@/contexts/C02/C02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import createTooltipExColumn from "@/shared-components/dsg/columns/tooltip-ex/createTooltipExColumn";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import C02ProdGrid from "./C02ProdGrid";

export const C02ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c02 = useContext(C02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return c02.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			onUpdateRow: c02.onUpdateRow,
			onGridChanged: c02.onGridChanged,
			isRowDeletable: c02.isRowDeletable,
		});
	}, [c02, formMeta.gridMeta]);

	const prodInfoColumn = useMemo(() => {
		return {
			...keyColumn("tooltip", createTooltipExColumn({
				arrow: true,
				placement: "left-start",
			}))
		}
	}, [])

	return (
		<DSGContext.Provider value={{
			...c02.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<C02ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={c02.gridData}
				bearer={auth.token}
				height={height - 326}
				getRowKey={c02.getRowKey}
				prodDisabled={c02.prodDisabled}
				rqtQtyDisabled={c02.rqtQtyDisabled}
				supplierNameDisabled={c02.supplierNameDisabled}
				createRow={c02.createRow}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C02ProdGridContainer.displayName = "C02ProdGridContainer";

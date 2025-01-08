import { useContext } from "react";
import C02ProdGrid from "./C02ProdGrid";
import { C02Context } from "@/contexts/C02/C02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import { keyColumn } from "react-datasheet-grid";

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
			...keyColumn("tooltip", createTooltipColumn({
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

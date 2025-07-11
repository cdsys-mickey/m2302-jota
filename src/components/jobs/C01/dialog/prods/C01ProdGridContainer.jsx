import { useContext } from "react";
import C01ProdGrid from "./C01ProdGrid";
import { C01Context } from "@/contexts/C01/C01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import createTooltipExColumn from "@/shared-components/dsg/columns/tooltip-ex/createTooltipExColumn";

export const C01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c01 = useContext(C01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	const _height = useMemo(() => {
		return height - 320
	}, [height])

	const onChange = useMemo(() => {
		return c01.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			onUpdateRow: c01.onUpdateRow,
			onGridChanged: c01.onGridChanged,
			isRowDeletable: c01.isRowDeletable,
		});
	}, [c01, formMeta.gridMeta]);

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
			...c01.grid,
			...formMeta.gridMeta,
			readOnly: !c01.editing
		}}>
			<C01ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={c01.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={c01.getRowKey}
				createRow={c01.createRow}
				prodDisabled={c01.prodDisabled}
				rqtQtyDisabled={c01.rqtQtyDisabled}
				orderQtyDisabled={c01.orderQtyDisabled}
				supplierDisabled={c01.supplierDisabled}
				supplierNameDisabled={c01.supplierNameDisabled}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C01ProdGridContainer.displayName = "C01ProdGridContainer";

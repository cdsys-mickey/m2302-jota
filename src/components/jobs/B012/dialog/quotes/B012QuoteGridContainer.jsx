import { useContext } from "react";
import B012QuoteGrid from "./B012QuoteGrid";
import { B012Context } from "@/contexts/B012/B012Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";

export const B012QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return b012.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			onUpdateRow: b012.onUpdateRow,
			onCheckRow: b012.onCheckRow,
			isRowCreatable: false
		})
	}, [b012, form.getValues, formMeta.gridMeta])
	// const onChange = useMemo(() => {
	// 	return b012.buildGridChangeHandlerOld({
	// 		gridMeta: formMeta.gridMeta,
	// 		getValues: form.getValues,
	// 		onUpdateRow: b012.onUpdateRow
	// 	})
	// }, [b012, form.getValues, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 250;
	}, [height])

	const contextMenu = useMemo(() => {
		return b012.canDelete ? createDSGContextMenuComponent({
			filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
		}) : createDSGContextMenuComponent({
			filterItem: (item) => [].includes(item.type),
		})
	}, [b012.canDelete])

	return (
		<DSGContext.Provider value={{
			...b012.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B012QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b012.grid.gridData}
				onChange={onChange}
				// onChange={b012.buildGridChangeHandler({
				// 	gridMeta: formMeta.gridMeta,
				// 	getValues: form.getValues,
				// 	onUpdateRow: b012.onUpdateRow
				// })}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={b012.getRowKey}
				createRow={b012.createRow}
				autoAddRow={false}
				addRowsComponent={b012.creating ? DSGAddRowsToolbar : null}
				contextMenuComponent={contextMenu}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B012QuoteGridContainer.displayName = "B012QuoteGridContainer";



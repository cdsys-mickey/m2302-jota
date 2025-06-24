import RecvAcctDocPickerCell from "@/components/dsg/columns/RecvAcctDocPickerCell/RecvAcctDocPickerCell";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { dateInputColumn } from "@/shared-components/dsg/columns/date-input/dateInputColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext } from "react-hook-form";
import { G06Context } from "../../G06Context";
import G06DocGrid from "./G06DocGrid";

export const G06DocGridContainer = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);
	// const auth = useContext(AuthContext);
	const form = useFormContext();

	const readOnly = useMemo(() => {
		return g06.docGridDisabled;
	}, [g06.docGridDisabled])

	const _height = useMemo(() => {
		return 240;
	}, [])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"DocID",
					// optionPickerColumn(G10DocPickerCellContainer, {
					optionPickerColumn(RecvAcctDocPickerCell, {
						name: "DocID",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						forId: true,
						slotProps: {
							paper: {
								sx: {
									width: 340,
								},
							},
						},
					})
				),
				title: "銷售/銷退單號",
				minWidth: 160,
				maxWidth: 160,
				disabled: true,
			},
			{
				...keyColumn("DocDate", dateInputColumn),
				title: "單據日期",
				minWidth: 110,
				maxWidth: 110,
				disabled: true,
			},
			{
				...keyColumn("SalAmt", createFloatColumn(2)),
				title: "銷售金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("RetAmt", createFloatColumn(2)),
				title: "銷退金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("AdjAmt", createFloatColumn(2)),
				title: "調整金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn(
					"WoNotes",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "沖銷",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const docGridMeta = useDSGMeta({
		data: g06.docGrid.gridData,
		grid: g06.docGrid,
		// setGridData: g06.docGrid.setGridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		createRow: g06.createDocRow,
		setValue: form.setValue
	});

	const onChange = useMemo(() => {
		return g06.docGrid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: docGridMeta,
			// onUpdateRow: g06.onUpdateDocRow,
			onGridChanged: g06.onDocGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [docGridMeta, form.getValues, form.setValue, g06.docGrid, g06.onDocGridChanged]);

	return (
		<DSGContext.Provider
			value={{
				...g06.docGrid,
				...docGridMeta,
				readOnly: !g06.editing
			}}>
			<G06DocGrid
				gridRef={docGridMeta.setGridRef}
				readOnly={g06.docGridDisabled}
				columns={docGridMeta.columns}
				data={g06.docGrid.gridData}
				onChange={onChange}
				onActiveCellChange={docGridMeta.handleActiveCellChange}
				// bearer={auth.token}
				height={_height}
				createRow={g06.createDocRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
G06DocGridContainer.propTypes = {
	store: PropTypes.bool,
};
G06DocGridContainer.displayName = "G06DocGridContainer";

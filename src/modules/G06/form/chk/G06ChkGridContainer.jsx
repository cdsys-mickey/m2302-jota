import { dateInputColumn } from "@/shared-components/dsg/columns/date-input/dateInputColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext } from "react-hook-form";
import { G06Context } from "../../G06Context";
import G06ChkGrid from "./G06ChkGrid";
import BankPickerCell from "@/components/BankPicker/BankPickerCell";

export const G06ChkGridContainer = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);
	// const auth = useContext(AuthContext);
	// const formMeta = useContext(FormMetaContext);
	const form = useFormContext();
	// const { height } = useWindowSize();

	const readOnly = useMemo(() => {
		return g06.chkGridDisabled;
	}, [g06.chkGridDisabled])

	const _height = useMemo(() => {
		// return height - 288 + (readOnly ? 48 : 0)
		return 240;
	}, [])

	const columns = useMemo(
		() => [
			{
				...keyColumn("ChkAmt", createFloatColumn(2)),
				title: "票據金額",
				minWidth: 130,
				maxWidth: 130,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"BankID",
					optionPickerColumn(BankPickerCell, {
						// optionPickerColumn(BankPickerComponentContainer, {
						name: "BankID",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 340,
								},
							},
						},
					})
				),
				title: "付款銀行",
				minWidth: 160,
				maxWidth: 160,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"BankAcct",
					createTextColumnEx()
				),
				title: "銀行帳號",
				disabled: readOnly,
				minWidth: 120,
				// maxWidth: 120,
			},
			{
				...keyColumn(
					"ChkNo",
					createTextColumnEx()
				),
				title: "支票號碼",
				disabled: readOnly,
				minWidth: 120,
				maxWidth: 120,
			},
			{
				...keyColumn("DueDate", dateInputColumn),
				title: "到期日",
				minWidth: 110,
				maxWidth: 110,
				disabled: readOnly,
			},
			{
				...keyColumn("IssueDate", dateInputColumn),
				title: "開票日",
				minWidth: 110,
				maxWidth: 110,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const chkGridMeta = useDSGMeta({
		data: g06.chkGrid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	});

	const onChange = useMemo(() => {
		return g06.chkGrid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: chkGridMeta,
			onUpdateRow: g06.onUpdateChkRow,
			onGridChanged: g06.onChkGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [chkGridMeta, form.getValues, form.setValue, g06.chkGrid, g06.onChkGridChanged, g06.onUpdateChkRow]);

	return (
		<DSGContext.Provider
			value={{
				...g06.cmsGrid,
				...chkGridMeta,
				readOnly: !g06.editing
			}}>
			<G06ChkGrid
				gridRef={chkGridMeta.setGridRef}
				readOnly={g06.cashGridDisabled}
				columns={chkGridMeta.columns}
				data={g06.chkGrid.gridData}
				onChange={onChange}
				onActiveCellChange={chkGridMeta.handleActiveCellChange}
				// bearer={auth.token}
				height={_height}
				createRow={g06.createChkRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
G06ChkGridContainer.propTypes = {
	store: PropTypes.bool,
};
G06ChkGridContainer.displayName = "G06ChkGridContainer";

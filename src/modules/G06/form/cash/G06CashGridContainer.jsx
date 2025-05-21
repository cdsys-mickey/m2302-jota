import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import G06CashGrid from "./G06CashGrid";
import { G06Context } from "../../G06Context";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { keyColumn } from "react-datasheet-grid";
import { dateInputColumn } from "@/shared-components/dsg/columns/date-input/dateInputColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useFormContext } from "react-hook-form";

export const G06CashGridContainer = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);
	// const auth = useContext(AuthContext);
	// const formMeta = useContext(FormMetaContext);
	const form = useFormContext();
	// const { height } = useWindowSize();

	const readOnly = useMemo(() => {
		return g06.cmsGridDisabled;
	}, [g06.cmsGridDisabled])

	const _height = useMemo(() => {
		// return height - 288 + (readOnly ? 48 : 0)
		return 240;
	}, [])

	const columns = useMemo(
		() => [
			{
				...keyColumn("RcvDate", dateInputColumn),
				title: "收款日期",
				minWidth: 110,
				maxWidth: 110,
				disabled: readOnly,
			},
			{
				...keyColumn("CashAmt", createFloatColumn(2)),
				title: "收現金額",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("DnsAmt", createFloatColumn(2)),
				title: "折讓金額",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const cashGridMeta = useDSGMeta({
		data: g06.cashGrid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	});

	const onChange = useMemo(() => {
		return g06.cashGrid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: cashGridMeta,
			onUpdateRow: g06.onUpdateCashRow,
			onGridChanged: g06.onCashGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [cashGridMeta, form.getValues, form.setValue, g06.cashGrid, g06.onCashGridChanged, g06.onUpdateCashRow]);

	return (
		<DSGContext.Provider
			value={{
				...g06.cmsGrid,
				...cashGridMeta,
				readOnly: !g06.editing
			}}>
			<G06CashGrid
				gridRef={cashGridMeta.setGridRef}
				readOnly={g06.cashGridDisabled}
				columns={cashGridMeta.columns}
				data={g06.cashGrid.gridData}
				onChange={onChange}
				onActiveCellChange={cashGridMeta.handleActiveCellChange}
				// bearer={auth.token}
				height={_height}
				createRow={g06.createCashRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
G06CashGridContainer.propTypes = {
	store: PropTypes.bool,
};
G06CashGridContainer.displayName = "ProdTransGridContainer";

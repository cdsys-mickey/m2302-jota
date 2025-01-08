import { C06Context } from "@/contexts/C06/C06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import C06ProdGrid from "./C06ProdGrid";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import { keyColumn } from "react-datasheet-grid";

export const C06ProdGridContainer = (props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);
	const c06 = useContext(C06Context);
	const formMeta = useContext(FormMetaContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const onChange = useMemo(() => {
		return c06.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: c06.onUpdateRow,
			onGridChanged: c06.onGridChanged
		});
	}, [c06, form.getValues, form.setValue, formMeta.gridMeta]);

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
			...c06.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<C06ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={c06.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 310}
				getRowKey={c06.getRowKey}
				getSPriceClassName={c06.getSPriceClassName}
				creating={c06.creating}
				sqtyDisabled={c06.sqtyDisabled}
				stypeDisabled={c06.stypeDisabled}
				sprodDisabled={c06.sprodDisabled}
				disableAddRows={c06.disableAddRows}
				createRow={c06.createRow}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C06ProdGridContainer.displayName = "C06ProdGridContainer";

import { useContext } from "react";
import D05ProdGrid from "./D05ProdGrid";
import { D05Context } from "@/contexts/D05/D05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";
import FormMeta from "@/shared-modules/sd-form-meta";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import { keyColumn } from "react-datasheet-grid";

export const D05ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d05 = useContext(D05Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const readOnly = useMemo(() => {
		return !d05.editing;
	}, [d05.editing]);

	const _height = useMemo(() => {
		return height - 318;
	}, [height]);

	const onChange = useMemo(() => {
		return d05.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: d05.onUpdateRow,
			onGridChanged: d05.onGridChanged
		})
	}, [d05, form.getValues, form.setValue, formMeta.gridMeta])

	const prodInfoColumn = useMemo(() => {
		return {
			...keyColumn("tooltip", createTooltipColumn({
				arrow: true,
				placement: "bottom-end",
			}))
		}
	}, [])

	return (
		<DSGContext.Provider value={{
			...d05.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<D05ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={d05.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={d05.getRowKey}
				customerDisabled={d05.customerDisabled}
				deptDisabled={d05.deptDisabled}
				sqtyDisabled={d05.sqtyDisabled}
				dtypeDisabled={d05.dtypeDisabled}
				createRow={d05.createRow}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D05ProdGridContainer.displayName = "D05ProdGridContainer";

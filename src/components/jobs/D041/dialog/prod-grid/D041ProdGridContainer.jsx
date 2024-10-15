import { useContext } from "react";
import D041ProdGrid from "./D041ProdGrid";
import { D041Context } from "@/contexts/D041/D041Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const D041ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d041 = useContext(D041Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return d041.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
		});
	}, [d041, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return formMeta.readOnly ? height - 300 : height - 310;
	}, [formMeta.readOnly, height])

	return (
		<DSGContext.Provider value={{
			...d041.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<D041ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={d041.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={d041.getRowKey}
				dtypeDisabled={d041.dtypeDisabled}
				stypeDisabled={d041.stypeDisabled}
				reworkedDisabled={d041.reworkedDisabled}
				createRow={d041.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D041ProdGridContainer.displayName = "D041ProdGridContainer";

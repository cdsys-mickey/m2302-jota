import { useContext } from "react";
import F03ProdGrid from "./F03ProdGrid";
import { F03Context } from "@/contexts/F03/F03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const F03ProdGridContainer = (props) => {
	const { ...rest } = props;
	const f03 = useContext(F03Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return f03.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
			// handleRefreshAmt: f03.handleRefreshAmt,
		});
	}, [f03, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return formMeta.readOnly ? height - 246 : height - 146;
	}, [formMeta.readOnly, height])

	return (
		<DSGContext.Provider value={{
			...f03.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<F03ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={f03.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={f03.getRowKey}
				createRow={f03.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

F03ProdGridContainer.displayName = "F03ProdGridContainer";


import { C07Context } from "@/contexts/C07/C07Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import C07ProdGrid from "./C07ProdGrid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

export const C07ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const supplier = useWatch({
		name: "supplier",
		conrtol: form.control,
	});

	const rtnDate = useWatch({
		name: "GrtDate",
		control: form.control,
	});

	const onChange = useMemo(() => {
		return c07.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c07, form.getValues, form.setValue]);

	const _height = useMemo(() => {
		return height - 390
	}, [height])

	return (
		<DSGContext.Provider value={{ ...c07.grid, ...formMeta.gridMeta, readOnly: formMeta.readOnly }}>
			<C07ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				// readOnly={!c07.editing || !supplier || !rtnDate}
				readOnly={formMeta.readOnly}
				data={c07.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={c07.getRowKey}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C07ProdGridContainer.displayName = "C07ProdGridContainer";

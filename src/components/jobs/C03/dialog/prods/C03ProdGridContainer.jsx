import { useContext } from "react";
import C03ProdGrid from "./C03ProdGrid";
import { C03Context } from "@/contexts/C03/C03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const C03ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c03 = useContext(C03Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const onChange = useMemo(() => {
		return c03.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c03, form.getValues, form.setValue]);

	// const supplier = useWatch({
	// 	name: "supplier",
	// 	control: form.control
	// })

	// const ordDate = useWatch({
	// 	name: "OrdDate",
	// 	control: form.control
	// })

	// const readOnly = useMemo(() => {
	// 	return !c03.editing || !supplier || ordDate;
	// }, [c03.editing, ordDate, supplier]);

	return (
		<DSGContext.Provider value={{
			...c03.grid,
			...c03.gridMeta,
			readOnly: !c03.editing
		}}>
			<C03ProdGrid
				gridRef={c03.setGridRef}
				readOnly={!c03.editing}
				// readOnly={readOnly}
				data={c03.gridData || []}

				bearer={auth.token}
				height={c03.editing ? height - 358 : height - 408}
				getRowKey={c03.getRowKey}
				spriceDisabled={c03.spriceDisabled}
				sqtyDisabled={c03.sqtyDisabled}
				prodDisabled={c03.prodDisabled}
				onChange={onChange}
				onActiveCellChange={c03.handleActiveCellChange}
				createRow={c03.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C03ProdGridContainer.displayName = "C03ProdGridContainer";

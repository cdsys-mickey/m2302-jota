import { useContext } from "react";
import C04ProdGrid from "./C04ProdGrid";
import { C04Context } from "@/contexts/C04/C04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const C04ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const supplier = useWatch({
		name: "supplier",
		conrtol: form.control,
	});

	const rstDate = useWatch({
		name: "GinDate",
		control: form.control,
	});

	const onChange = useMemo(() => {
		return c04.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: c04.handleRefreshAmt,
		});
	}, [c04, form.getValues, form.setValue]);

	return (
		<DSGContext.Provider value={{
			...c04.grid,
			...c04.gridMeta,
			readOnly: !c04.editing
		}}>
			<C04ProdGrid
				gridRef={c04.setGridRef}
				readOnly={!c04.editing || !supplier || !rstDate}
				data={c04.gridData}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c04.getRowKey}
				prodDisabled={c04.prodDisabled}
				spriceDisabled={c04.spriceDisabled}
				getSPriceClassName={c04.getSPriceClassName}
				onChange={onChange}
				onActiveCellChange={c04.handleActiveCellChange}
				createRow={c04.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C04ProdGridContainer.displayName = "C04ProdGridContainer";

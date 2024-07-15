import { useContext } from "react";
import D01ProdGrid from "./D01ProdGrid";
import { D01Context } from "@/contexts/D01/D01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d01 = useContext(D01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return d01.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: d01.handleRefreshAmt,
		});
	}, [d01, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D01ProdGrid
				gridRef={d01.setGridRef}
				readOnly={!d01.editing}
				data={d01.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 310}
				getRowKey={d01.getRowKey}
				createRow={d01.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D01ProdGridContainer.displayName = "D01ProdGridContainer";

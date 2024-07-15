import { useContext } from "react";
import D041ProdGrid from "./D041ProdGrid";
import { D041Context } from "@/contexts/D041/D041Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D041ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d041 = useContext(D041Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return d041.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: d041.handleRefreshAmt,
		});
	}, [d041, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D041ProdGrid
				gridRef={d041.setGridRef}
				readOnly={!d041.editing}
				data={d041.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 300}
				getRowKey={d041.getRowKey}
				dtypeDisabled={d041.dtypeDisabled}
				stypeDisabled={d041.stypeDisabled}
				reworkedDisabled={d041.reworkedDisabled}
				createRow={d041.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D041ProdGridContainer.displayName = "D041ProdGridContainer";

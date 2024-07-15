import { useContext } from "react";
import D06ProdGrid from "./D06ProdGrid";
import { D06Context } from "@/contexts/D06/D06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D06ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d06 = useContext(D06Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return d06.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: d06.handleRefreshAmt,
		});
	}, [d06, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D06ProdGrid
				gridRef={d06.setGridRef}
				readOnly={!d06.editing}
				data={d06.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 360}
				getRowKey={d06.getRowKey}
				createRow={d06.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D06ProdGridContainer.displayName = "D06ProdGridContainer";

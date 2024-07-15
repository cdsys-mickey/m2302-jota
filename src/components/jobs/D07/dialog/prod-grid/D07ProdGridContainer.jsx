import { useContext } from "react";
import D07ProdGrid from "./D07ProdGrid";
import { D07Context } from "@/contexts/D07/D07Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D07ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d07 = useContext(D07Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return d07.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: d07.handleRefreshAmt,
		});
	}, [d07, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D07ProdGrid
				gridRef={d07.setGridRef}
				readOnly={!d07.editing}
				data={d07.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 250}
				getRowKey={d07.getRowKey}
				createRow={d07.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D07ProdGridContainer.displayName = "D07ProdGridContainer";

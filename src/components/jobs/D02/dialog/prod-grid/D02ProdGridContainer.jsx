import { useContext } from "react";
import D02ProdGrid from "./D02ProdGrid";
import { D02Context } from "@/contexts/D02/D02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D02ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d02 = useContext(D02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return d02.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			// handleRefreshAmt: d02.handleRefreshAmt,
		});
	}, [d02, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D02ProdGrid
				gridRef={d02.setGridRef}
				readOnly={!d02.editing}
				data={d02.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 300}
				getRowKey={d02.getRowKey}
				createRow={d02.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D02ProdGridContainer.displayName = "D02ProdGridContainer";

import { useContext } from "react";
import D05ProdGrid from "./D05ProdGrid";
import { D05Context } from "@/contexts/D05/D05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const D05ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d05 = useContext(D05Context);
	const auth = useContext(AuthContext);
	const { height: windowHeight } = useWindowSize();
	const form = useFormContext();

	const readOnly = useMemo(() => {
		return !d05.editing;
	}, [d05.editing]);

	const height = useMemo(() => {
		return windowHeight - 310;
	}, [windowHeight]);

	// const handleGridChange = useMemo(() => {
	// 	return d05.buildGridChangeHandler({
	// 		getValues: form.getValues,
	// 		setValue: form.setValue,
	// 	});
	// }, [d05, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<D05ProdGrid
				gridRef={d05.setGridRef}
				readOnly={readOnly}
				data={d05.gridData}
				// handleGridChange={handleGridChange}
				handleGridChange={d05.buildGridChangeHandler({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height}
				getRowKey={d05.getRowKey}
				customerDisabled={d05.customerDisabled}
				deptDisabled={d05.deptDisabled}
				sqtyDisabled={d05.sqtyDisabled}
				dtypeDisabled={d05.dtypeDisabled}
				createRow={d05.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

D05ProdGridContainer.displayName = "D05ProdGridContainer";

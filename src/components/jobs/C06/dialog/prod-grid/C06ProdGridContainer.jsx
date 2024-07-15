import { useContext } from "react";
import C06ProdGrid from "./C06ProdGrid";
import { C06Context } from "@/contexts/C06/C06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const C06ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c06 = useContext(C06Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const spDept = useWatch({
		name: "spDept",
		conrtol: form.control,
	});

	const handleGridChange = useMemo(() => {
		return c06.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c06, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<C06ProdGrid
				gridRef={c06.setGridRef}
				readOnly={!c06.editing || !spDept}
				data={c06.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 310}
				getRowKey={c06.getRowKey}
				getSPriceClassName={c06.getSPriceClassName}
				creating={c06.creating}
				sqtyDisabled={c06.sqtyDisabled}
				stypeDisabled={c06.stypeDisabled}
				sprodDisabled={c06.sprodDisabled}
				disableAddRows={c06.disableAddRows}
				createRow={c06.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

C06ProdGridContainer.displayName = "C06ProdGridContainer";

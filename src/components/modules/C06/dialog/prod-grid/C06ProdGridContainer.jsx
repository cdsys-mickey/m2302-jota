import { useContext } from "react";
import C06ProdGrid from "./C06ProdGrid";
import { C06Context } from "@/contexts/C06/C06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";

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

	return (
		<DSGBox disableAddRows={c06.disableAddRows}>
			<C06ProdGrid
				gridRef={c06.setGridRef}
				readOnly={!c06.editing || !spDept}
				data={c06.gridData}
				handleGridChange={c06.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height - 350}
				getRowKey={c06.getRowKey}
				getSPriceClassName={c06.getSPriceClassName}
				creating={c06.creating}
				sqtyDisabled={c06.sqtyDisabled}
				stypeDisabled={c06.stypeDisabled}
				sprodDisabled={c06.sprodDisabled}
				disableAddRows={c06.disableAddRows}
				{...rest}
			/>
		</DSGBox>
	);
};

C06ProdGridContainer.displayName = "C06ProdGridContainer";
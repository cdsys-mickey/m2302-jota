import { useContext } from "react";
import C09ProdGrid from "./C09ProdGrid";
import { C09Context } from "@/contexts/C09/C09Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const C09ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);
	const auth = useContext(AuthContext);
	const { height: windowHeight } = useWindowSize();
	const form = useFormContext();

	const txoDept = useWatch({
		name: "txoDept",
		conrtol: form.control,
	});

	const txoOrder = useWatch({
		name: "txoOrder",
		conrtol: form.control,
	});

	const readOnly = useMemo(() => {
		return !c09.editing || !txoDept || !!txoOrder;
	}, [c09.editing, txoDept, txoOrder]);

	const height = useMemo(() => {
		return windowHeight - 356;
	}, [windowHeight]);

	return (
		<DSGBox>
			<C09ProdGrid
				gridRef={c09.setGridRef}
				readOnly={readOnly}
				data={c09.gridData}
				handleGridChange={c09.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height}
				getRowKey={c09.getRowKey}
				dtypeDisabled={c09.dtypeDisabled}
				stypeDisabled={c09.stypeDisabled}
				sprodDisabled={c09.sprodDisabled}
				sqtyDisabled={c09.sqtyDisabled}
				getSPriceClassName={c09.getSPriceClassName}
				{...rest}
			/>
		</DSGBox>
	);
};

C09ProdGridContainer.displayName = "C09ProdGridContainer";

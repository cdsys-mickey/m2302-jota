import { C09Context } from "@/contexts/C09/C09Context";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import { C09ProdGridSubtotalLabel } from "./C09ProdGridSubtotalLabel";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";

const RightComponent = () => {
	return (
		<>
			<C09ProdGridSubtotalLabel name="TxiAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C09ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);
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

	if (!readOnly) {
		return false;
	}

	return <ToolbarEx ref={ref} RightComponent={RightComponent} {...rest} />;
});

C09ProdGridBottomToolbar.propTypes = {};

C09ProdGridBottomToolbar.displayName = "C09ProdGridBottomToolbar";

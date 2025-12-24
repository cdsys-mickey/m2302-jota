import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import { C03Context } from "@/contexts/C03/C03Context";
import { FlexBox } from "shared-components";
import { C03ProdGridSubtotalLabel } from "./C03ProdGridSubtotalLabel";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

const RightComponent = () => {
	return (
		<>
			<C03ProdGridSubtotalLabel name="OrdAmt_N" />
			<FlexBox minWidth="10px" />
		</>
	);
};

export const C03ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	// const c03 = useContext(C03Context);
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	return <ToolbarEx ref={ref} RightComponent={RightComponent} {...rest} />;
});

C03ProdGridBottomToolbar.propTypes = {};

C03ProdGridBottomToolbar.displayName = "C03ProdGridBottomToolbar";

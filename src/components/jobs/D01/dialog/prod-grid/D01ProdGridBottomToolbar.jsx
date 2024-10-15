import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D01Context } from "@/contexts/D01/D01Context";
import FlexBox from "@/shared-components/FlexBox";
import { D01ProdGridSubtotalLabel } from "./D01ProdGridSubtotalLabel";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

const RightComponent = () => {
	return (
		<>
			<D01ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D01ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D01ProdGridBottomToolbar.propTypes = {};

D01ProdGridBottomToolbar.displayName = "D01ProdGridBottomToolbar";


import { C08Context } from "@/contexts/C08/C08Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, useContext } from "react";
import { C08ProdGridSubtotalLabel } from "./C08ProdGridSubtotalLabel";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

const RightComponent = () => {
	return (
		<>
			<C08ProdGridSubtotalLabel name="TxoAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C08ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}
	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C08ProdGridBottomToolbar.propTypes = {};

C08ProdGridBottomToolbar.displayName = "C08ProdGridBottomToolbar";

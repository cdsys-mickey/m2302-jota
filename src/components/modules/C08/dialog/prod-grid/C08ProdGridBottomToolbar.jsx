import { C08Context } from "@/contexts/C08/C08Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { C08ProdGridSubtotalLabel } from "./C08ProdGridSubtotalLabel";

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
	const c08 = useContext(C08Context);

	if (c08.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C08ProdGridBottomToolbar.propTypes = {};

C08ProdGridBottomToolbar.displayName = "C08ProdGridBottomToolbar";

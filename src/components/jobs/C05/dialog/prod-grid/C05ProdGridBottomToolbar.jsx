import { C05Context } from "@/contexts/C05/C05Context";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import { C05ProdGridSubtotalLabel } from "./C05ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<C05ProdGridSubtotalLabel name="RtAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C05ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c05 = useContext(C05Context);

	if (c05.editing) {
		return false;
	}

	return <ToolbarEx ref={ref} RightComponent={RightComponent} {...rest} />;
});

C05ProdGridBottomToolbar.propTypes = {};

C05ProdGridBottomToolbar.displayName = "C05ProdGridBottomToolbar";

import { C07Context } from "@/contexts/C07/C07Context";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import { C07ProdGridSubtotalLabel } from "./C07ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<C07ProdGridSubtotalLabel name="OrdAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C07ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);

	if (c07.editing) {
		return false;
	}

	return <ToolbarEx ref={ref} RightComponent={RightComponent} {...rest} />;
});

C07ProdGridBottomToolbar.propTypes = {};

C07ProdGridBottomToolbar.displayName = "C07ProdGridBottomToolbar";

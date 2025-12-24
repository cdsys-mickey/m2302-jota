import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import { D041Context } from "@/contexts/D041/D041Context";
import { FlexBox } from "shared-components";
import { D041ProdGridSubtotalLabel } from "./D041ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<D041ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D041ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(D041Context);

	if (c04.editing) {
		return false;
	}

	return <ToolbarEx ref={ref} RightComponent={RightComponent} {...rest} />;
});

D041ProdGridBottomToolbar.propTypes = {};

D041ProdGridBottomToolbar.displayName = "D041ProdGridBottomToolbar";




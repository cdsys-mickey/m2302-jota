import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D01Context } from "@/contexts/D01/D01Context";
import FlexBox from "@/shared-components/FlexBox";
import { D01ProdGridSubtotalLabel } from "./D01ProdGridSubtotalLabel";

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
	const c04 = useContext(D01Context);

	if (c04.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D01ProdGridBottomToolbar.propTypes = {};

D01ProdGridBottomToolbar.displayName = "D01ProdGridBottomToolbar";


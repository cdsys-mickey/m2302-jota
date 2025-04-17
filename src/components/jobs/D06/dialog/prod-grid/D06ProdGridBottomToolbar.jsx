import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, useContext } from "react";
import { D06Context } from "@/contexts/D06/D06Context";
import FlexBox from "@/shared-components/FlexBox";
import { D06ProdGridSubtotalLabel } from "./D06ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<D06ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D06ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(D06Context);

	if (c04.editing) {
		return false;
	}

	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D06ProdGridBottomToolbar.propTypes = {};

D06ProdGridBottomToolbar.displayName = "D06ProdGridBottomToolbar";




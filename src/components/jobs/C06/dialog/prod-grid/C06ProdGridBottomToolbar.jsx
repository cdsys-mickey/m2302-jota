import { C06Context } from "@/contexts/C06/C06Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, useContext } from "react";
import { C06ProdGridSubtotalLabel } from "./C06ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<C06ProdGridSubtotalLabel name="OrdAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C06ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c06 = useContext(C06Context);

	if (c06.editing && !c06.disableAddRows) {
		return false;
	}

	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C06ProdGridBottomToolbar.propTypes = {};

C06ProdGridBottomToolbar.displayName = "C06ProdGridBottomToolbar";

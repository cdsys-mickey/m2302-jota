import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { C04Context } from "@/contexts/C04/C04Context";
import FlexBox from "@/shared-components/FlexBox";
import { C04ProdGridSubtotalLabel } from "./C04ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<C04ProdGridSubtotalLabel name="InAmt" />
		</>
	);
};

export const C04ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);

	if (c04.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C04ProdGridBottomToolbar.propTypes = {};

C04ProdGridBottomToolbar.displayName = "C04ProdGridBottomToolbar";

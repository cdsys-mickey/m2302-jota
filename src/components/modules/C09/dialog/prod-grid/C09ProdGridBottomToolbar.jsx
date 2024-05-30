import { C09Context } from "@/contexts/C09/C09Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { C09ProdGridSubtotalLabel } from "./C09ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<C09ProdGridSubtotalLabel name="RtAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const C09ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);

	if (c09.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C09ProdGridBottomToolbar.propTypes = {};

C09ProdGridBottomToolbar.displayName = "C09ProdGridBottomToolbar";

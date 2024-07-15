import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D02Context } from "@/contexts/D02/D02Context";
import FlexBox from "@/shared-components/FlexBox";
import { D02ProdGridSubtotalLabel } from "./D02ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<D02ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D02ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(D02Context);

	if (c04.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D02ProdGridBottomToolbar.propTypes = {};

D02ProdGridBottomToolbar.displayName = "D02ProdGridBottomToolbar";



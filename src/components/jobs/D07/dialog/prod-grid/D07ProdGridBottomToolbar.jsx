import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D07Context } from "@/contexts/D07/D07Context";
import FlexBox from "@/shared-components/FlexBox";
import { D07ProdGridSubtotalLabel } from "./D07ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<D07ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D07ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(D07Context);

	if (c04.editing) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D07ProdGridBottomToolbar.propTypes = {};

D07ProdGridBottomToolbar.displayName = "D07ProdGridBottomToolbar";





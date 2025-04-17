import { C07Context } from "@/contexts/C07/C07Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
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

	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

C07ProdGridBottomToolbar.propTypes = {};

C07ProdGridBottomToolbar.displayName = "C07ProdGridBottomToolbar";

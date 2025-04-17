import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, useContext } from "react";
import { F03Context } from "@/contexts/F03/F03Context";
import FlexBox from "@/shared-components/FlexBox";
import { F03ProdGridSubtotalLabel } from "./F03ProdGridSubtotalLabel";

const RightComponent = () => {
	return (
		<>
			<F03ProdGridSubtotalLabel name="InAmt" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const F03ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const c04 = useContext(F03Context);

	if (c04.editing) {
		return false;
	}

	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

F03ProdGridBottomToolbar.propTypes = {};

F03ProdGridBottomToolbar.displayName = "F03ProdGridBottomToolbar";






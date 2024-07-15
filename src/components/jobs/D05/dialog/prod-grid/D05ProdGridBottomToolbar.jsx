import { D05Context } from "@/contexts/D05/D05Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D05ProdGridSubtotalLabel } from "./D05ProdGridSubtotalLabel";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";

const RightComponent = () => {
	return (
		<>
			<D05ProdGridSubtotalLabel name="TotAmt_N" />
			{/* <FlexBox minWidth="10px" /> */}
		</>
	);
};

export const D05ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const d05 = useContext(D05Context);

	const readOnly = useMemo(() => {
		return !d05.editing;
	}, [d05.editing]);

	if (!readOnly) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D05ProdGridBottomToolbar.propTypes = {};

D05ProdGridBottomToolbar.displayName = "D05ProdGridBottomToolbar";

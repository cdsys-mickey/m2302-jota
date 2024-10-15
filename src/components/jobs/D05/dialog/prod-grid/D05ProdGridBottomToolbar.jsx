import { D05Context } from "@/contexts/D05/D05Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import { D05ProdGridSubtotalLabel } from "./D05ProdGridSubtotalLabel";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

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
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	if (!formMeta.readOnly) {
		return false;
	}

	return <FlexToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D05ProdGridBottomToolbar.propTypes = {};

D05ProdGridBottomToolbar.displayName = "D05ProdGridBottomToolbar";

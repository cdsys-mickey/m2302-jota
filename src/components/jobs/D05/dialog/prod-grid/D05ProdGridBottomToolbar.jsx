import { D05Context } from "@/contexts/D05/D05Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, useContext } from "react";
import { D05ProdGridSubtotalLabel } from "./D05ProdGridSubtotalLabel";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

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

	return <ListToolbar ref={ref} RightComponent={RightComponent} {...rest} />;
});

D05ProdGridBottomToolbar.propTypes = {};

D05ProdGridBottomToolbar.displayName = "D05ProdGridBottomToolbar";

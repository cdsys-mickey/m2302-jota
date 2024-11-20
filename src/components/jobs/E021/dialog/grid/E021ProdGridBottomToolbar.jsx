import DSGBottomToolbar from "@/shared-components/listview/toolbar/DSGBottomToolbar";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { forwardRef, useContext } from "react";
import E021ProdGridToolbarLabels from "./E021ProdGridToolbarLabels";



export const E021ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	return <DSGBottomToolbar ref={ref} RightComponent={E021ProdGridToolbarLabels} {...rest} />;
});

E021ProdGridBottomToolbar.propTypes = {};

E021ProdGridBottomToolbar.displayName = "E021ProdGridBottomToolbar";


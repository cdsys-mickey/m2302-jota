import DSGBottomToolbar from "@/shared-components/listview/toolbar/DSGBottomToolbar";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { forwardRef, useContext } from "react";
import E01ProdGridToolbarLabels from "./E01ProdGridToolbarLabels";



export const E01ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	return <DSGBottomToolbar ref={ref} RightComponent={E01ProdGridToolbarLabels} {...rest} />;
});

E01ProdGridBottomToolbar.propTypes = {};

E01ProdGridBottomToolbar.displayName = "E01ProdGridBottomToolbar";

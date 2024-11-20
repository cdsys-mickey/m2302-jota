import DSGBottomToolbar from "@/shared-components/listview/toolbar/DSGBottomToolbar";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { forwardRef, useContext } from "react";
import E03ProdGridToolbarLabels from "./E03ProdGridToolbarLabels";



export const E03ProdGridBottomToolbar = forwardRef((props, ref) => {
	const { ...rest } = props;
	const formMeta = useContext(FormMetaContext);

	if (!formMeta.readOnly) {
		return false;
	}

	return <DSGBottomToolbar ref={ref} RightComponent={E03ProdGridToolbarLabels} {...rest} />;
});

E03ProdGridBottomToolbar.propTypes = {};

E03ProdGridBottomToolbar.displayName = "E03ProdGridBottomToolbar";



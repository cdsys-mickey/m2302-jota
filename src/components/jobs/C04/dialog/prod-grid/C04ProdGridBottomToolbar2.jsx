import { C04Context } from "@/contexts/C04/C04Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, useContext } from "react";
import C04ProdGridToolbarLabels from "./C04ProdGridToolbarLabels";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

const C04ProdGridBottomToolbar2 = forwardRef((props, ref) => {
	const { ...rest } = props;

	return <FlexToolbar ref={ref} RightComponent={C04ProdGridToolbarLabels} {...rest} />;
});

C04ProdGridBottomToolbar2.propTypes = {};

C04ProdGridBottomToolbar2.displayName = "C04ProdGridBottomToolbar2";
export default C04ProdGridBottomToolbar2;
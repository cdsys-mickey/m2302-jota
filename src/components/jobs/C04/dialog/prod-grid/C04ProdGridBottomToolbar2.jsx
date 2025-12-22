import { C04Context } from "@/contexts/C04/C04Context";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, useContext } from "react";
import C04ProdGridToolbarLabels from "./C04ProdGridToolbarLabels";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

const C04ProdGridBottomToolbar2 = forwardRef((props, ref) => {
	const { ...rest } = props;

	return <ToolbarEx ref={ref} RightComponent={C04ProdGridToolbarLabels} {...rest} />;
});

C04ProdGridBottomToolbar2.propTypes = {};

C04ProdGridBottomToolbar2.displayName = "C04ProdGridBottomToolbar2";
export default C04ProdGridBottomToolbar2;
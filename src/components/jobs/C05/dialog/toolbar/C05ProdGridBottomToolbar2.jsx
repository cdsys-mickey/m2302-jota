import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef } from "react";
import C05ProdGridToolbarLabels from "../prod-grid/C05ProdGridToolbarLabels";

const C05ProdGridBottomToolbar2 = forwardRef((props, ref) => {
	const { ...rest } = props;

	return <FlexToolbar ref={ref} RightComponent={C05ProdGridToolbarLabels} {...rest} />;
});

C05ProdGridBottomToolbar2.propTypes = {};

C05ProdGridBottomToolbar2.displayName = "C05ProdGridBottomToolbar2";
export default C05ProdGridBottomToolbar2;
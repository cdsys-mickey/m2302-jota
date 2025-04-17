import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import G02TotalAmtLabel from "./G02TotalAmtLabel";
import { useContext } from "react";
import { G02Context } from "./G02Context";

const G02BottomToolbar = (props) => {
	const { ...rest } = props;
	const g02 = useContext(G02Context);

	if (!g02.isAnyChecked) {
		return false;
	}

	return (
		<FlexToolbar
			rightComponents={[<G02TotalAmtLabel key="total-amt" />]}
			{...rest}
		/>
	);
}

G02BottomToolbar.propTypes = {

}

G02BottomToolbar.displayName = "G02BottomToolbar";
export default G02BottomToolbar;
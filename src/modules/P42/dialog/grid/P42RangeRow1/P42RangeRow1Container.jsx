import { P42Context } from "@/modules/P42/P42Context";
import DSGToolbarBoxView from "@/shared-components/dsg/DSGToolbarBoxView";
import { useContext } from "react";
import P42RangeRow1View from "./P42RangeRow1View";

const P42RangeRow1Container = () => {
	const p42 = useContext(P42Context);

	if (p42.editing) {
		return <P42RangeRow1View />
	}

	return (
		<DSGToolbarBoxView>
			<P42RangeRow1View />
		</DSGToolbarBoxView>
	)
}

P42RangeRow1Container.displayName = "P42RangeRow1Container";
export default P42RangeRow1Container;
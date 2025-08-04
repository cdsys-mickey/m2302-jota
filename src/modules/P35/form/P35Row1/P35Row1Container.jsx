import DSGToolbarBoxView from "@/shared-components/dsg/DSGToolbarBoxView";
import { useContext } from "react";
import { P35Context } from "../../P35Context";
import P35Row1View from "./P35Row1View";

const P35Row1Container = () => {
	const p35 = useContext(P35Context);

	if (p35.editing) {
		return <P35Row1View />
	}

	return (
		<DSGToolbarBoxView>
			<P35Row1View />
		</DSGToolbarBoxView>
	)
}

P35Row1Container.displayName = "P35Row1Container";
export default P35Row1Container;
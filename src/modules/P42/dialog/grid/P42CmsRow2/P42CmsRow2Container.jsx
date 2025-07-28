import { useContext } from "react";
import P42CmsRow2View from "./P42CmsRow2View";
import { P42Context } from "@/modules/P42/P42Context";
import DSGToolbarBoxView from "@/shared-components/dsg/DSGToolbarBoxView";

const P42CmsRow2Container = () => {
	const p42 = useContext(P42Context);
	// if (p42.editing) {
	// 	return <P42CmsRow2View editing={p42.editing} mt={0.5} />
	// }
	return (
		<DSGToolbarBoxView>
			<P42CmsRow2View
				editing={p42.editing}
			/>
		</DSGToolbarBoxView>
	)
}

P42CmsRow2Container.displayName = "P42CmsRow2Container";
export default P42CmsRow2Container;
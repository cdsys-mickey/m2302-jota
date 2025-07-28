import { useContext } from "react";
import P42CmsRow1View from "./P42CmsRow1View";
import { P42Context } from "@/modules/P42/P42Context";
import DSGToolbarBoxView from "@/shared-components/dsg/DSGToolbarBoxView";

const P42CmsRow1Container = () => {
	const p42 = useContext(P42Context);

	if (p42.editing) {
		return <P42CmsRow1View
			editing={p42.editing}
			{...(!p42.editing && {
				mr: "18px"
			})}
			{...(p42.editing && {

			})}

		/>
	}

	return (
		<DSGToolbarBoxView>
			<P42CmsRow1View
				editing={p42.editing}
				{...(!p42.editing && {
					mr: "18px"
				})}
				{...(p42.editing && {

				})}

			/>
		</DSGToolbarBoxView>)
}

P42CmsRow1Container.displayName = "P42CmsRow1Container";
export default P42CmsRow1Container;
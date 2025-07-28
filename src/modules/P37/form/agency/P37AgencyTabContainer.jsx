import { useContext } from "react";
import P37Context from "../../P37Context";
import P37AgencyTabView from "./P37AgencyTabView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useScrollable } from "@/shared-hooks/useScrollable";

const P37AgencyTabContainer = () => {
	const p37 = useContext(P37Context);
	const { height } = useWindowSize();

	return <P37AgencyTabView maxHeight={height - 220} editing={p37.editing} />
}

P37AgencyTabContainer.displayName = "P37AgencyTabContainer";
export default P37AgencyTabContainer;
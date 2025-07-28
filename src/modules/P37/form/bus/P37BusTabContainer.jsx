import { useContext } from "react";
import P37Context from "../../P37Context";
import P37BusTabView from "./P37BusTabView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useScrollable } from "@/shared-hooks/useScrollable";

const P37BusTabContainer = () => {
	const p37 = useContext(P37Context);
	const { height } = useWindowSize();

	return <P37BusTabView maxHeight={height - 220} editing={p37.editing} />
}

P37BusTabContainer.displayName = "P37BusTabContainer";
export default P37BusTabContainer;
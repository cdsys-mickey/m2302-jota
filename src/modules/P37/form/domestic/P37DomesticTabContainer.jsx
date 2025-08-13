import { useContext } from "react";
import P37Context from "../../P37Context";
import P37DomesticTabView from "./P37DomesticTabView";

const P37DomesticTabContainer = () => {
	const p37 = useContext(P37Context);

	return <P37DomesticTabView editing={p37.editing} />
}

P37DomesticTabContainer.displayName = "P37DomesticTabContainer";
export default P37DomesticTabContainer;
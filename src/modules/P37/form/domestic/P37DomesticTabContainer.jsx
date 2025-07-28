import { useContext } from "react";
import P37DomesticTabView from "./P37DomesticTabView";
import P37Context from "../../P37Context";
import { useInit } from "@/shared-hooks/useInit";
import P37 from "../../P37.mjs";
import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useFormContext } from "react-hook-form";

const P37DomesticTabContainer = () => {
	const p37 = useContext(P37Context);



	return <P37DomesticTabView editing={p37.editing} />
}

P37DomesticTabContainer.displayName = "P37DomesticTabContainer";
export default P37DomesticTabContainer;
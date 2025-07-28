import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P37Context from "../../P37Context";
import P37ChinaTabView from "./P37ChinaTabView";

const P37ChinaTabContainer = () => {
	const p37 = useContext(P37Context);
	const form = useFormContext();
	const { reset } = form;

	useChangeTracking(() => {
		if (p37.itemDataReady) {
			reset(p37.itemData);
		}
	}, [p37.itemData, p37.itemDataReady]);
	return <P37ChinaTabView editing={p37.editing} busCmsType={p37.busCmsType} handleBusCmsTypeChange={p37.handleBusCmsTypeChange} />
}

P37ChinaTabContainer.displayName = "P37ChinaTabContainer";
export default P37ChinaTabContainer;
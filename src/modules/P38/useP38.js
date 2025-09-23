import { useCallback, useState } from "react";
import P38 from "./P38.mjs";
import { useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";

export default function useP38() {
	const [selectedTab, setSelectedTab] = useState(P38.TABS.TITLE);
	const crud = useContext(CrudContext);
	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	return {
		...crud,
		selectedTab,
		handleTabChange
	}

}
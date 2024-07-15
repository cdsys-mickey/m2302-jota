import { useState } from "react";
import { KitchenSink } from "./KitchenSink";
import { useCallback } from "react";

export const KitchenSinkContainer = (props) => {
	const { ...rest } = props;
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = useCallback((e, newTab) => {
		console.log("newTab", newTab);
		setSelectedTab(newTab);
	}, []);

	return (
		<KitchenSink
			selectedTab={selectedTab}
			handleTabChange={handleTabChange}
			{...rest}
		/>
	);
};

KitchenSinkContainer.displayName = "KitchenSinkContainer";

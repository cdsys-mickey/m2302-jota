import { useState } from "react";
import { KitchenSink } from "./KitchenSink";
import { useCallback } from "react";
import Lab from "../../modules/md-lab";
import { useWindowSize } from "../../shared-hooks/useWindowSize";

export const KitchenSinkContainer = (props) => {
	const { ...rest } = props;
	const [selectedTab, setSelectedTab] = useState(Lab.Tabs[0].value);
	const { height } = useWindowSize();

	const handleTabChange = useCallback((e, newTab) => {
		console.log("newTab", newTab);
		setSelectedTab(newTab);
	}, []);

	return (
		<KitchenSink
			selectedTab={selectedTab}
			handleTabChange={handleTabChange}
			tabs={Lab.Tabs}
			height={height - 90}
			{...rest}
		/>
	);
};

KitchenSinkContainer.displayName = "KitchenSinkContainer";

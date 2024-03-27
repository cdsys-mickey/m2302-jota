import { useContext } from "react";
import ZA03DialogContent from "./ZA03DialogContent";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useMemo } from "react";

export const ZA03DialogContentContainer = () => {
	const za03 = useContext(ZA03Context);

	const infoDisabled = useMemo(() => {
		return !!za03.authEditingMode;
	}, [za03.authEditingMode]);

	const authDisabled = useMemo(() => {
		return za03.editing;
	}, [za03.editing]);

	return (
		<ZA03DialogContent
			readWorking={za03.readWorking}
			dataLoaded={za03.itemDataLoaded}
			selectedTab={za03.selectedTab}
			onTabChange={za03.handleTabChange}
			infoDisabled={infoDisabled}
			authDisabled={authDisabled}
		/>
	);
};

ZA03DialogContentContainer.displayName = "ZA03DialogContentContainer";

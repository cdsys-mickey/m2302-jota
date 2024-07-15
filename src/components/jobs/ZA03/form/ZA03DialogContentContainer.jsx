import { useContext } from "react";
import ZA03DialogContent from "./ZA03DialogContent";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useMemo } from "react";

export const ZA03DialogContentContainer = () => {
	const za03 = useContext(ZA03Context);

	const infoDisabled = useMemo(() => {
		return !!za03.authGridEditingMode;
	}, [za03.authGridEditingMode]);

	const authDisabled = useMemo(() => {
		return za03.editing;
	}, [za03.editing]);

	return (
		<ZA03DialogContent
			readWorking={za03.readWorking}
			itemDataReady={za03.itemDataReady}
			selectedTab={za03.selectedTab}
			onTabChange={za03.handleTabChange}
			infoDisabled={infoDisabled}
			authDisabled={authDisabled}
			readError={za03.readError}
		/>
	);
};

ZA03DialogContentContainer.displayName = "ZA03DialogContentContainer";

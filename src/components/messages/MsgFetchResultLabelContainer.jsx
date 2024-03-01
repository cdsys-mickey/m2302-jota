import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { useContext } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";

export const MsgFetchResultLabelContainer = () => {
	const messaging = useContext(MessagingContext);
	return (
		<FetchResultLabel
			totalElements={messaging.itemCount}
			startIndex={messaging.visibleStartIndex}
			endIndex={messaging.visibleStopIndex}
		/>
	);
};

MsgFetchResultLabelContainer.displayName = "MsgFetchResultLabelContainer";

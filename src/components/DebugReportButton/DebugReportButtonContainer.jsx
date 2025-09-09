import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext } from "react";
import DebugReportButtonView from "./DebugReportButtonView";

const DebugReportButtonContainer = (props) => {
	const { ...rest } = props;
	const { debugEnabled } = useContext(AuthContext);


	if (!debugEnabled) {
		return false;
	}
	return <DebugReportButtonView {...rest} />
}

DebugReportButtonContainer.displayName = "DebugDialogButtonContainer";
export default DebugReportButtonContainer;
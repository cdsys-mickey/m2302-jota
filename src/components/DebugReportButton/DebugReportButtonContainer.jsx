import Auth from "@/modules/md-auth";
import Cookies from "js-cookie";
import DebugReportButtonView from "./DebugReportButtonView";

const DebugReportButtonContainer = (props) => {
	const { ...rest } = props;
	let impersonate = Cookies.get(Auth.COOKIE_MODE) === "im";
	if (!impersonate) {
		return false;
	}
	return <DebugReportButtonView {...rest} />
}

DebugReportButtonContainer.displayName = "DebugDialogButtonContainer";
export default DebugReportButtonContainer;
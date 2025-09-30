import { useContext } from "react";
import ToastExContext from "./ToastExContext";
import ToastExView from "./ToastExView";

const ToastExContainer = (props) => {
	const { ...rest } = props;
	const toastEx = useContext(ToastExContext);
	return <ToastExView theme={toastEx.theme} {...rest} />
}

ToastExContainer.displayName = "ToastExContainer";
export default ToastExContainer;
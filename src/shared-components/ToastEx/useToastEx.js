import { useContext } from "react";
import ToastExContext from "./ToastExContext";

export default function useToastEx() {
	return useContext(ToastExContext);
}

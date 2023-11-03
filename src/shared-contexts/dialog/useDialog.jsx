import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export const useDialogsContext = () => {
	return useContext(DialogContext);
};

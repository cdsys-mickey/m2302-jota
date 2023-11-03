import { useContext } from "react";
import { AppFrameContext } from "./AppFrameContext";

const useAppFrame = () => {
	return useContext(AppFrameContext);
};

export default useAppFrame;

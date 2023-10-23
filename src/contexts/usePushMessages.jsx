import { useContext } from "react";
import { PushMessagesContext } from "./PushMessagesContext";

const usePushMessages = () => {
	return useContext(PushMessagesContext);
};

export default usePushMessages;

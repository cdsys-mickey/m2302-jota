import _ from "lodash";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";

import PushMessageContent from "@/components/push-messages/PushMessageContent";
import { MockMessages } from "@/mocks/mock-messages";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";

export const PushMessagesContext = createContext();

export const PushMessagesProvider = ({ children }) => {
	const { handleSelectJob } = useContext(AppFrameContext);
	const [state, setState] = useState({
		data: MockMessages,
	});

	// Popover
	const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
	const handlePopoverOpen = (e) => {
		console.log("handlePopoverOpen");
		setPopoverAnchorEl(e.currentTarget);
	};

	const togglePopoverOpen = (e) => {
		console.log("togglePopoverOpen");
		setPopoverAnchorEl(popoverAnchorEl ? null : e.currentTarget);
	};

	const handlePopoverClose = () => {
		console.log("handlePopoverClose");
		setPopoverAnchorEl(null);
	};

	const handleGenerateToast = useCallback(() => {
		const selected = state.data[_.random(state.data.length - 1)];
		const { id, ...otherProps } = selected;
		toast(
			<PushMessageContent
				onSelectJob={handleSelectJob}
				onPopoverClose={handlePopoverClose}
				{...otherProps}
			/>
		);
	}, [handleSelectJob, state.data]);

	return (
		<PushMessagesContext.Provider
			value={{
				...state,
				handleGenerateToast,
				popoverAnchorEl,
				handlePopoverOpen,
				togglePopoverOpen,
				handlePopoverClose,
			}}>
			{children}
		</PushMessagesContext.Provider>
	);
};

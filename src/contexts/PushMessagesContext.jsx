import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useAuth } from "@/contexts/useAuth";

import PushMessageContent from "@/components/push-messages/PushMessageContent";
import { MockMessages } from "@/mocks/mock-messages";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";

const PushMessagesContext = createContext();

export const usePushMessages = () => {
	return useContext(PushMessagesContext);
};

export const PushMessagesProvider = ({ children }) => {
	const { handleSelectJob } = useProtectedLayout();
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

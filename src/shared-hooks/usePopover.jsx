import { useMemo } from "react";
import { useCallback, useState } from "react";

export const usePopover = () => {
	const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

	const handlePopoverOpen = useCallback((e) => {
		console.log("handlePopoverOpen", e.currentTarget);
		setPopoverAnchorEl(e.currentTarget);
	}, []);

	const togglePopoverOpen = useCallback(
		(e) => {
			console.log("togglePopoverOpen");
			setPopoverAnchorEl(popoverAnchorEl ? null : e.currentTarget);
		},
		[popoverAnchorEl]
	);

	const handlePopoverClose = useCallback(() => {
		console.log("handlePopoverClose");
		setPopoverAnchorEl(null);
	}, []);

	const popoverOpen = useMemo(() => {
		return !!popoverAnchorEl;
	}, [popoverAnchorEl]);

	return {
		popoverAnchorEl,
		handlePopoverOpen,
		togglePopoverOpen,
		handlePopoverClose,
		popoverOpen,
	};
};

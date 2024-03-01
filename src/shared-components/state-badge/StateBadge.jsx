import { HubConnectionState } from "@microsoft/signalr";
import { Badge, styled } from "@mui/material";
import { useMemo } from "react";
import ConnectionStates from "../../shared-modules/sd-conn-states";

const StateBadge = styled(Badge)(({ theme, state }) => {
	const color = useMemo(() => ConnectionStates.getColor(state), [state]);
	const working = useMemo(() => {
		return (
			state === HubConnectionState.Connecting ||
			state === HubConnectionState.Disconnecting
		);
	}, [state]);
	return {
		"& .MuiBadge-badge": {
			backgroundColor: color,
			color: color,
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			"&::after": {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				borderRadius: "50%",
				...(working && {
					animation: "ripple 1.2s infinite ease-in-out",
				}),
				border: "1px solid currentColor",
				content: '""',
			},
		},
		"@keyframes ripple": {
			"0%": {
				transform: "scale(.8)",
				opacity: 1,
			},
			"100%": {
				transform: "scale(2.4)",
				opacity: 0,
			},
		},
	};
});

export default StateBadge;

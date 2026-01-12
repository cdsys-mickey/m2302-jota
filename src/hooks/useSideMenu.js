import { useCallback, useContext, useMemo, useState } from "react";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";

export const useSideMenu = ({ bgcolor = "#fff" } = {}) => {
	const theme = useTheme();
	const textColor = useMemo(() => {
		return theme.palette.getContrastText(bgcolor);
	}, [bgcolor, theme.palette]);

	// const inputRef = useRef(null);
	// const form = useForm();
	// const { control } = form;
	// const q = useWatch({
	// 	name: "q",
	// 	control,
	// });
	// const { authorities } = useContext(AuthContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;

	const [filteredAuthorities, setFilteredAuthorities] = useState();

	const [viewportState, setViewportState] = useState({
		visibleStartIndex: 0,
		visibleStopIndex: 0,
		bottomReached: false,
	});

	const handleItemsRendered = useCallback(
		(i) => {
			// console.log(`handleItemsRendered`, i);
			setViewportState({
				visibleStartIndex: i.visibleStartIndex,
				visibleStopIndex: i.visibleStopIndex,
				bottomReached:
					i.visibleStopIndex ==
					(filteredAuthorities?.length || 1) - 1,
			});
		},
		[filteredAuthorities?.length]
	);

	const filterByInput = useCallback((item, q) => {
		if (!q) {
			return true;
		}
		const qs = q.trim().toLowerCase();
		return (
			item.JobID?.toLowerCase().startsWith(qs) ||
			item.JobName?.toLowerCase().includes(qs)
		);
	}, []);

	const onSubmit = useCallback(
		(data) => {
			console.log("onSubmit", data);
			// 選取列表內第一個
			if (filteredAuthorities?.length > 0) {
				handleSelect(filteredAuthorities[0]);
			}
		},
		[handleSelect, filteredAuthorities]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	const onAuthoritiesChange = useCallback(
		(authorities, q) => {
			setFilteredAuthorities(
				!q
					? authorities?.filter((x) => filterByInput(x, q))
					: authorities
							?.filter((x) => filterByInput(x, q))
							.sort((x, y) => {
								if (x.JobID?.length < y.JobID?.length) {
									return -1;
								} else if (x.JobID?.length > y.JobID?.length) {
									return 1;
								} else if (x.Seq < y.Seq) {
									return -1;
								} else if (x.Seq > y.Seq) {
									return 1;
								}
								return 0;
							})
			);
		},
		[filterByInput]
	);

	return {
		filteredAuthorities,
		// inputRef,
		// q,
		onAuthoritiesChange,
		onSubmit,
		onSubmitError,
		handleItemsRendered,
		...viewportState,
		bgcolor,
		textColor,
	};
};

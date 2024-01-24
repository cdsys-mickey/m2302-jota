import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { SideMenuContext } from "./SideMenuContext";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";

export const SideMenuProvider = ({ children }) => {
	const inputRef = useRef(null);
	const forms = useForm();
	const { control } = forms;
	const q = useWatch({
		name: "q",
		control,
	});
	const { authorities } = useContext(AuthContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;

	const [state, setState] = useState({
		filteredAuthorities: null,
	});

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
					i.visibleStopIndex !==
					(state.filteredAuthorities?.length || 1) - 1,
			});
		},
		[state.filteredAuthorities?.length]
	);

	const filterByInput = useCallback(
		(a) => {
			if (!q) {
				return true;
			}
			const qs = q.trim().toLowerCase();
			return (
				a.JobID.toLowerCase().startsWith(qs) ||
				a.JobName.toLowerCase().includes(qs)
			);
		},
		[q]
	);

	const onSubmit = useCallback(
		(data) => {
			console.log("onSubmit", data);
			// 選取列表內第一個
			if (state.filteredAuthorities?.length > 0) {
				handleSelect(state.filteredAuthorities[0]);
			}
		},
		[handleSelect, state.filteredAuthorities]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	useEffect(() => {
		console.log(`q:${q}`);
	}, [q]);

	useEffect(() => {
		// console.log("authorities fetched from AuthContext", authorities);
		setState((prev) => ({
			...prev,
			filteredAuthorities: !q
				? authorities?.filter((x) => filterByInput(x))
				: authorities
						?.filter((x) => filterByInput(x))
						.sort((x, y) => {
							if (x.JobID.length < y.JobID.length) {
								return -1;
							} else if (x.JobID.length > y.JobID.length) {
								return 1;
							} else if (x.Seq < y.Seq) {
								return -1;
							} else if (x.Seq > y.Seq) {
								return 1;
							}
							return 0;
						}),
		}));
	}, [authorities, filterByInput, q]);

	return (
		<SideMenuContext.Provider
			value={{
				...state,
				inputRef,
				q,
				onSubmit,
				onSubmitError,
				handleItemsRendered,
				...viewportState,
			}}>
			<FormProvider {...forms}>
				{/* <form onSubmit={forms.handleSubmit(onSubmit, onSubmitError)}> */}
				{children}
				{/* </form> */}
			</FormProvider>
		</SideMenuContext.Provider>
	);
};

SideMenuProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

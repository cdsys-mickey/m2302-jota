import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { SideMenuContext } from "./SideMenuContext";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

export const SideMenuProvider = ({ children }) => {
	const inputRef = useRef(null);
	const forms = useForm();
	const { control } = forms;
	const q = useWatch({
		name: "q",
		control,
	});
	const { authorities } = useContext(AuthContext);

	const [state, setState] = useState({
		filteredAuthorities: null,
	});

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

	const onSubmit = useCallback((data) => {
		console.debug("onSubmit", data);
	}, []);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	useEffect(() => {
		console.debug(`q:${q}`);
	}, [q]);

	useEffect(() => {
		// console.debug("authorities fetched from AuthContext", authorities);
		setState((prev) => ({
			...prev,
			filteredAuthorities: authorities?.filter((a) => filterByInput(a)),
		}));
	}, [authorities, filterByInput]);

	return (
		<SideMenuContext.Provider
			value={{
				...state,
				inputRef,
				q,
				onSubmit,
				onSubmitError,
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

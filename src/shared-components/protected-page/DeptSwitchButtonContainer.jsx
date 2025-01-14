import { useMemo } from "react";
import SplitButton from "../SplitButton";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

import { useState } from "react";
import { useCallback } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useEffect } from "react";
import DeptOptions from "@/modules/DeptOptions.mjs";

const DeptSwitchButtonContainer = (props) => {
	const { ...rest } = props;
	const { operator, token, switchDept } = useContext(AuthContext);
	const { httpGetAsync } = useWebApi();

	const [state, setState] = useState({
		open: false,
		loading: null,
		options: null
	});

	const currentDept = useMemo(() => {
		return operator ? {
			DeptID: operator.CurDeptID,
			DeptName: operator.CurDeptName,
			AbbrName: operator.AbbrName
		} : null
	}, [operator])

	const handleOpen = useCallback(() => {
		setState((prev) => ({
			...prev,
			open: true,
		}));
	}, []);

	const handleClose = useCallback(() => {
		setState((prev) => ({ ...prev, open: false }));
	}, []);

	const handleToggle = useCallback(() => {
		console.log("handleToggle")
		setState((prev) => ({
			...prev,
			open: !prev.open,
		}));
	}, []);

	const loadOptions = useCallback(async () => {
		setState(prev => ({
			...prev,
			loading: true
		}))
		try {
			const { status, payload, error } = await httpGetAsync({
				url: "v1/auth/depts",
				bearer: token,
			})
			if (status.success) {
				setState(prev => ({
					...prev,
					options: payload,
					loading: false
				}))
			} else {
				throw error || new Error("未預期例外");
			}
		} finally {
			setState(prev => ({
				...prev,
				loading: false
			}))

		}
	}, [httpGetAsync, token]);

	useEffect(() => {
		if (state.loading == null) {
			loadOptions();
		}
	}, [loadOptions, state.loading]);

	return (
		<SplitButton
			label="單位"
			defaultSelected={currentDept}
			getLabel={DeptOptions.getOptionName}
			getOptionKey={DeptOptions.getOptionKey}
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			onOpen={handleOpen}
			onClose={handleClose}
			onToggle={handleToggle}
			onClick={handleToggle}
			onItemClick={switchDept}
			clickOnSelect
			slotProps={{
				typography: {
					variant: "h6"
				}
			}}
			{...state}
			{...rest}
		/>)
}

DeptSwitchButtonContainer.displayName = "DeptSwitchButtonContainer";
export default DeptSwitchButtonContainer;
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext, useMemo } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeptOptions from "@/modules/DeptOptions.mjs";
import useDebounceState from "@/shared-hooks/useDebounceState";
import { useWebApi } from "@/shared-hooks/useWebApi";

import { useCallback, useEffect, useState } from "react";
import DropDownButton from "../DropDownButton";

const DeptSwitchButtonContainer = (props) => {
	const { ...rest } = props;
	const { operator, token, switchDept } = useContext(AuthContext);
	const { httpGetAsync } = useWebApi();

	const [open, setOpen] = useState(false);
	// const [debouncedOpen, setDebouncedOpen] = useDebounceState(open, { callback: setOpen });
	const [debouncedOpen, setDebouncedOpen] = useDebounceState(open);

	const [state, setState] = useState({
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
		// setState((prev) => ({
		// 	...prev,
		// 	open: true,
		// }));
		// setDebouncedOpen(true, setOpen);
		setOpen(true);
	}, []);

	const handleClose = useCallback((e) => {
		console.log("sw.handleClose");
		// setState((prev) => ({ ...prev, open: false }));
		setOpen(false);
	}, []);

	const handleToggle = useCallback(() => {
		console.log("handleToggle")
		setDebouncedOpen(prev => {
			console.log("prev", prev);
			return !prev;
		});
	}, [setDebouncedOpen]);

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
		if (debouncedOpen && state.loading == null) {
			loadOptions();
		}
	}, [debouncedOpen, loadOptions, state.loading]);

	return (
		<DropDownButton
			label="單位"
			defaultSelected={currentDept}
			getLabel={DeptOptions.getOptionName}
			getOptionKey={DeptOptions.getOptionKey}
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			open={debouncedOpen}
			onOpen={handleOpen}
			onClose={handleClose}
			onToggle={handleToggle}
			onClick={handleToggle}
			onSelect={switchDept}
			hoverToOpen
			IconComponent={ExpandMoreIcon}
			slotProps={{
				typography: {
					variant: "h6"
				},
				paper: {
					elevation: 8
				}
			}}
			{...state}
			{...rest}
		/>)
}

DeptSwitchButtonContainer.displayName = "DeptSwitchButtonContainer";
export default DeptSwitchButtonContainer;
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext, useMemo } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeptOptions from "@/modules/DeptOptions.mjs";
import useDebounceState from "@/shared-hooks/useDebounceState";
import { useWebApiAsync } from "@/shared-hooks";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import DropDownButton from "../../shared-components/DropDownButton";
import useAppRedirect from "@/hooks/useAppRedirect";
import useSharedOptions from "@/shared-components/option-picker/useSharedOptions";
import Auth from "@/modules/Auth.mjs";
import { lightBlue, pink } from "@mui/material/colors";
import { SharedOptionsContext } from "@/shared-components/option-picker/SharedOptionsContext";

const DeptSwitchButtonContainer = (props) => {
	const { sharedKey, defaultOptions = [], ...rest } = props;
	const { operator, token, switchDept } = useContext(AuthContext);
	const { httpGetAsync } = useWebApiAsync();
	const appRedirect = useAppRedirect();
	const [open, setOpen] = useState(false);
	// const [debouncedOpen, setDebouncedOpen] = useDebounceState(open, { callback: setOpen });
	const [debouncedOpen, setDebouncedOpen] = useDebounceState(open);
	const sharedOptions = useContext(SharedOptionsContext);

	const [state, setState] = useState({
		loading: null,
		// options: null
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
		// setOpen(true);
		setDebouncedOpen(true, setOpen);
	}, [setDebouncedOpen]);

	const handleClose = useCallback((e) => {
		console.log("sw.handleClose");
		// setOpen(false);
		setDebouncedOpen(false, setOpen);
	}, [setDebouncedOpen]);

	const handleToggle = useCallback(() => {
		console.log("handleToggle")
		setDebouncedOpen(prev => {
			console.log("prev", prev);
			return !prev;
		});
	}, [setDebouncedOpen]);

	const [_options, setOptions] = useSharedOptions({
		sharedKey, defaultOptions, onInit: () => {
			setState(prev => ({
				...prev,
				loading: false
			}))
		}
	});

	const loadOptions = useCallback(async () => {
		console.log("loadOptions triggered");
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
					// options: payload,
					loading: false
				}))
				setOptions(payload);
			} else {
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			if (err?.status == 401) {
				appRedirect.toLogin();
			}
		} finally {
			setState(prev => ({
				...prev,
				loading: false
			}))

		}
	}, [appRedirect, httpGetAsync, setOptions, token]);

	useEffect(() => {
		if (debouncedOpen && state.loading == null) {
			loadOptions();
		}
	}, [debouncedOpen, loadOptions, state.loading]);

	const spawn = useMemo(() => sessionStorage.getItem(Auth.COOKIE_SPAWN) == 1, []);

	const textColor = useMemo(() => {
		return spawn ? "success" : "success";
	}, [spawn])

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
			// hoverToOpen
			IconComponent={ExpandMoreIcon}
			color="info"
			size="large"
			{...(spawn && {
				color: pink[300]
			})}
			slotProps={{
				typography: {
					variant: "h6",
				},
				paper: {
					elevation: 8
				},
			}}
			{...state}
			// loading={true}
			options={_options}
			{...rest}
		/>)
}
DeptSwitchButtonContainer.propTypes = {
	sharedKey: PropTypes.string,
	defaultOptions: PropTypes.array
}
DeptSwitchButtonContainer.displayName = "DeptSwitchButtonContainer";
export default DeptSwitchButtonContainer;
import { forwardRef } from "react";
import AccountMenuButton from "./AccountMenuButton";
import { useAuth } from "@/contexts/useAuth";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";
import { useState } from "react";
import { useCallback } from "react";

export const AccountMenuButtonContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	// const { accountAnchorEl, handleAccountClick, handleAccountMenuClose } =
	// 	useProtectedLayout();

	const [accountAnchorEl, setAccountAnchorEl] = useState(null);

	const handleAccountClick = useCallback((e) => {
		setAccountAnchorEl(e.currentTarget);
	}, []);

	const handleAccountMenuClose = useCallback(() => {
		setAccountAnchorEl(null);
	}, []);

	return (
		<AccountMenuButton
			ref={ref}
			accountAnchorEl={accountAnchorEl}
			handleAccountClick={handleAccountClick}
			handleAccountMenuClose={handleAccountMenuClose}
			{...rest}
		/>
	);
});

AccountMenuButtonContainer.displayName = "AccountMenuButtonContainer";

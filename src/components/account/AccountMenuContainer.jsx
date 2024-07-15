import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext, useMemo } from "react";
import useAppRedirect from "../../hooks/useAppRedirect";
import Auth from "../../modules/md-auth";
import AccountMenu from "./AccountMenu";

export const AccountMenuContainer = ({ ...rest }) => {
	const auth = useContext(AuthContext);
	const { operator } = auth;
	const { gotoSettings } = useAppRedirect();

	const color = useMemo(
		() => Auth.getHeaderColor(operator.Class),
		[operator.Class]
	);

	return (
		<AccountMenu
			onSignOut={auth.confirmSignOut}
			gotoSettings={gotoSettings}
			headerColor={color}
			{...rest}
		/>
	);
};

AccountMenuContainer.displayName = "AccountMenuContainer";

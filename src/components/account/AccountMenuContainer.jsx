import { useContext } from "react";
import AccountMenu from "./AccountMenu";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useMemo } from "react";
import useAppRedirect from "../../hooks/useAppRedirect";
import Auth from "../../modules/md-auth";

export const AccountMenuContainer = ({ ...rest }) => {
	const auth = useContext(AuthContext);
	const { operator } = auth;
	const { toSettings } = useAppRedirect();

	const color = useMemo(
		() => Auth.getHeaderColor(operator.Class),
		[operator.Class]
	);

	return (
		<AccountMenu
			onSignOut={auth.confirmSignOut}
			toSettings={toSettings}
			headerColor={color}
			{...rest}
		/>
	);
};

AccountMenuContainer.displayName = "AccountMenuContainer";

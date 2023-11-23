import { useContext } from "react";
import AccountMenu from "./AccountMenu";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useMemo } from "react";

export const AccountMenuContainer = ({ ...rest }) => {
	const auth = useContext(AuthContext);
	const title = useMemo(() => {
		return `${auth.operator?.CurDeptName} ${auth.operator?.UserName}`;
	}, [auth.operator?.CurDeptName, auth.operator?.UserName]);
	return <AccountMenu title={title} {...rest} />;
};

AccountMenuContainer.displayName = "AccountMenuContainer";

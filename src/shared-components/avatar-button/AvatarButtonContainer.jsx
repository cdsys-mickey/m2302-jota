import MockAccountMenu from "@/mock-components/account/MockAccountMenu";
import { useCallback, useMemo, useState } from "react";
import AvatarButton from "./AvatarButton";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { AccountMenuContainer } from "@/components/account/AccountMenuContainer";

const AvatarButtonContainer = (props) => {
	const { ...rest } = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const { operator, deptSwitchWorking } = useContext(AuthContext);

	const handleClick = useCallback((e) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	// const fullName = useMemo(() => {
	// 	return !deptSwitchWorking
	// 		? `${operator?.CurDeptName || "?"} ${operator?.UserName || "?"}`
	// 		: "...";
	// }, [deptSwitchWorking, operator?.CurDeptName, operator?.UserName]);
	const fullName = useMemo(() => {
		return `${operator?.CurDeptName || "?"} ${operator?.UserName || "?"}`;
	}, [operator?.CurDeptName, operator?.UserName]);

	const name = useMemo(() => {
		return (operator?.UserName || "?")[0];
	}, [operator?.UserName]);

	// const Menu = (props) => <AccountMenuContainer {...props} />;

	return (
		<AvatarButton
			anchorEl={anchorEl}
			handleClick={handleClick}
			handleMenuClose={handleMenuClose}
			fullName={fullName}
			name={name}
			MenuComponent={AccountMenuContainer}
			{...rest}>
			{/* {Menu} */}
		</AvatarButton>
	);
};

AvatarButtonContainer.displayName = "AvatarButtonContainer";
export default AvatarButtonContainer;

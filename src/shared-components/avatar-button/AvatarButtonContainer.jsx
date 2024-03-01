import { useCallback, useMemo, useState } from "react";
import AvatarButton from "./AvatarButton";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { AccountMenuContainer } from "@/components/account/AccountMenuContainer";
import { MessagingContext } from "../../contexts/MessagingContext";

const AvatarButtonContainer = (props) => {
	const { ...rest } = props;
	const messaging = useContext(MessagingContext);
	const { connectionState } = messaging;

	const [anchorEl, setAnchorEl] = useState(null);
	const { operator, deptSwitchWorking } = useContext(AuthContext);

	const handleClick = useCallback((e) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const fullName = useMemo(() => {
		return `${operator?.CurDeptName || "?"} ${operator?.UserName || "?"}`;
	}, [operator?.CurDeptName, operator?.UserName]);

	const name = useMemo(() => {
		return (operator?.UserName || "?")[0];
	}, [operator?.UserName]);

	// const Menu = (props) => <AccountMenuContainer {...props} />;

	return (
		<AvatarButton
			state={connectionState}
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

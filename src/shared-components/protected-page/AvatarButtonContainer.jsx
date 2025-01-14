import { AccountMenuContainer } from "@/components/account/AccountMenuContainer";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import Auth from "@/modules/md-auth";
import { useCallback, useContext, useMemo, useState } from "react";
import AvatarButton from "../avatar-button/AvatarButton";

const AvatarButtonContainer = (props) => {
	const { ...rest } = props;
	const messaging = useContext(MessagingContext);
	const { connectionState } = messaging;

	const [anchorEl, setAnchorEl] = useState(null);
	const { operator } = useContext(AuthContext);

	const handleClick = useCallback((e) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const memoisedTitle = useMemo(() => {
		return `${operator?.CurDeptName || "?"} ${operator?.UserName || "?"}`;
	}, [operator?.CurDeptName, operator?.UserName]);

	const memoisedLabel = useMemo(() => {
		return (operator?.UserName || "?")[0];
	}, [operator?.UserName]);

	const color = useMemo(
		() => Auth.getHeaderColor(operator.Class),
		[operator.Class]
	);

	return (
		<AvatarButton
			state={connectionState}
			anchorEl={anchorEl}
			handleClick={handleClick}
			handleMenuClose={handleMenuClose}
			title={memoisedTitle}
			label={memoisedLabel}
			color={color}
			MenuComponent={AccountMenuContainer}
			{...rest}>
			{/* {Menu} */}
		</AvatarButton>
	);
};

AvatarButtonContainer.displayName = "AvatarButtonContainer";
export default AvatarButtonContainer;

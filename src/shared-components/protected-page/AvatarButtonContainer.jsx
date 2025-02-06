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

	const _title = useMemo(() => {
		return `${operator?.CurDeptName || "?"} ${operator?.UserName || "?"}`;
	}, [operator?.CurDeptName, operator?.UserName]);

	const _label = useMemo(() => {
		const userName = operator?.UserName || "?";

		// 判斷是否為中文（透過正則表達式）
		const isChinese = /[\u4e00-\u9fff]/.test(userName);

		return isChinese ? userName.slice(-2) : userName[0];
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
			title={_title}
			label={_label}
			color={color}
			MenuComponent={AccountMenuContainer}
			{...rest}>
			{/* {Menu} */}
		</AvatarButton>
	);
};

AvatarButtonContainer.displayName = "AvatarButtonContainer";
export default AvatarButtonContainer;

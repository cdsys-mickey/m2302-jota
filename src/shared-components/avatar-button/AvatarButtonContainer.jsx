import MockAccountMenu from "@/mock-components/account/MockAccountMenu";
import { useCallback, useMemo, useState } from "react";
import AvatarButton from "./AvatarButton";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { AccountMenuContainer } from "../../components/account/AccountMenuContainer";

const AvatarButtonContainer = (props) => {
	const { ...rest } = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const { operator } = useContext(AuthContext);

	const handleClick = useCallback((e) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const fullName = useMemo(() => {
		return `${operator?.DeptName || "?"} ${operator?.UserName || "?"}`;
	}, [operator?.DeptName, operator?.UserName]);

	const name = useMemo(() => {
		return (operator?.UserName || "?")[0];
	}, [operator?.UserName]);

	return (
		<AvatarButton
			anchorEl={anchorEl}
			handleClick={handleClick}
			handleMenuClose={handleMenuClose}
			Menu={MockAccountMenu}
			// Menu={AccountMenuContainer}
			fullName={fullName}
			name={name}
			{...rest}
		/>
	);
};

AvatarButtonContainer.displayName = "AvatarButtonContainer";
export default AvatarButtonContainer;

import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import SearchField from "@/shared-components/SearchField";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FlexBox from "@/shared-components/FlexBox";
import ControlledSearchField from "@/shared-components/controlled/ControlledSearchField";

const SideMenuSearchBar = React.forwardRef((props, ref) => {
	const { inputRef, onToggleDrawerOpen, name, ...rest } = props;

	return (
		<AppBar position="sticky" color="white" {...rest}>
			<FlexBox inline py={1}>
				<FlexBox flex={1}>
					<ControlledSearchField
						inputRef={inputRef}
						name="q"
						placeholder="篩選作業 (ctrl+F9)"
						shadowStyle="in"
						shadow="focus"
						focusBackgroundColor="rgb(0 0 0 / 10%)"
						hoverBackgroundColor="rgb(0 0 0 / 6%)"
						width="100%"
					/>
				</FlexBox>
				<IconButton onClick={onToggleDrawerOpen}>
					<MenuOpenIcon />
				</IconButton>
			</FlexBox>
		</AppBar>
	);
});

export default React.memo(SideMenuSearchBar);

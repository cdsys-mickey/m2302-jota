import FlexBox from "@/shared-components/FlexBox";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AppBar, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ControlledFilterField from "../controlled/ControlledFilterField";

const SideMenuSearchBar = memo(
	forwardRef((props, ref) => {
		const {
			name,
			inputRef,
			onToggleDrawerOpen,
			onClear,
			onHomeClick,
			...rest
		} = props;

		return (
			<AppBar position="sticky" color="white" ref={ref} {...rest}>
				<FlexBox py={1} pl={1}>
					<IconButton color="primary" onClick={onHomeClick}>
						<ViewColumnIcon />
					</IconButton>
					<ControlledFilterField
						name={name}
						inputRef={inputRef}
						onClear={onClear}
						searchIconPlacement="right"
						placeholder="篩選作業 (ctrl+F9)"
						shadowStyle="in"
						shadow="focus"
						focusBackgroundColor="rgb(0 0 0 / 10%)"
						hoverBackgroundColor="rgb(0 0 0 / 6%)"
						width="20ch"
						// onChange={onInputChange}
					/>
					{onToggleDrawerOpen && (
						<IconButton onClick={onToggleDrawerOpen}>
							<MenuOpenIcon />
						</IconButton>
					)}
				</FlexBox>
			</AppBar>
		);
	})
);

SideMenuSearchBar.propTypes = {
	name: PropTypes.string.isRequired,
	inputRef: PropTypes.object,
	onToggleDrawerOpen: PropTypes.func,
	// onInputChange: PropTypes.func,
};

export default SideMenuSearchBar;

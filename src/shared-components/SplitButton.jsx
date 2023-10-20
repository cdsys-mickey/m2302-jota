import {
	Button,
	ButtonGroup,
	ClickAwayListener,
	Grow,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Typography,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SplitButton = ({
	size = "medium",
	defaultSelected,
	openOnClick = false,
	getName,
	getIcon,
	getKey,
	options,
	clickOnSelect = false,
	placeholder = "請選擇",
	noGutter = false,
	// METHODS
	onClick,
	...rest
}) => {
	// const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	// const [selected, setSelected] = useState(defaultSelected);
	const [state, setState] = useState({
		open: false,
		selected: defaultSelected,
	});

	const handleOpen = useCallback(() => {
		setState((prev) => ({
			...prev,
			open: true,
		}));
	}, []);

	const handleToggle = useCallback(() => {
		setState((prev) => ({
			...prev,
			open: !prev.open,
		}));
	}, []);

	const handleClick = useCallback(
		(e) => {
			console.debug(state.selected, "click");
			if (!state.selected && openOnClick) {
				handleOpen();
				return;
			}
			if (onClick) {
				onClick(e, state.selected);
			}
		},
		[handleOpen, onClick, openOnClick, state.selected]
	);

	const handleClose = useCallback(() => {
		setState((prev) => ({ ...prev, open: false }));
	}, []);

	const handleMenuItemClick = useCallback(
		(e, t) => {
			e.stopPropagation();
			console.debug(t, "handleMenuItemClick");
			setState({
				selected: t,
				open: false,
			});
			if (clickOnSelect) {
				if (onClick) {
					onClick(e, t);
				} else {
					console.warn("onClick is not defined, trigger stopped");
				}
			}
		},
		[onClick, clickOnSelect]
	);

	return (
		<>
			<ButtonGroup
				variant="contained"
				size={size}
				ref={anchorRef}
				aria-label="doc type"
				{...rest}>
				<Button
					size={size}
					onClick={handleClick}
					startIcon={getIcon ? getIcon(state.selected) : null}
					sx={[
						noGutter && {
							"&.MuiButtonGroup-grouped:not(:last-of-type)": {
								borderRight: 0,
							},
						},
					]}>
					{getName
						? getName(state.selected) || placeholder
						: state.selected}
				</Button>
				<Button
					size={size}
					onClick={handleToggle}
					sx={[
						size === "small" && {
							"&.MuiButtonGroup-grouped": {
								minWidth: "20px",
								paddingLeft: "4px",
								paddingRight: "4px",
							},
						},
					]}>
					<ArrowDropDownIcon fontSize="small" />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
					minWidth: anchorRef.current?.clientWidth || "5rem",
				}}
				open={state.open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom"
									? "center top"
									: "center bottom",
						}}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{options &&
										options.map((item, index) => {
											return (
												<MenuItem
													key={item.key}
													selected={
														state.selected ===
														item.key
													}
													onClick={(e) =>
														handleMenuItemClick(
															e,
															item.key
														)
													}>
													{item.icon && (
														<ListItemIcon>
															{item.icon}
														</ListItemIcon>
													)}

													<ListItemText>
														{item.text}
													</ListItemText>
												</MenuItem>
											);
										})}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

export default React.memo(SplitButton);

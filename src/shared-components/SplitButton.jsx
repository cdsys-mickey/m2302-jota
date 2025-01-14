import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo, useRef, useState } from "react";
import LoadingTypography from "./LoadingTypography";


const SplitButton = memo(forwardRef((props, ref) => {
	const {
		size = "medium",
		defaultSelected,
		openOnClick = false,
		getLabel,
		open,
		getIcon,
		options,
		isOptionEqualToValue,
		getOptionKey,
		getOptionLabel,
		clickOnSelect = false,
		label = "請選擇",
		noGutter = false,
		dense = false,
		loading,
		slotProps,
		// METHODS
		onClick,
		onItemClick,
		onOpen,
		onClose,
		onToggle,
		hoverToOpen,
		IconComponent = ArrowDropDownIcon,
		...rest
	} = props;

	const anchorRef = useRef(null);
	const [state, setState] = useState({
		open: false,
		selected: defaultSelected,
	});

	const handleOpen = useCallback(() => {
		if (onOpen) {
			onOpen();
		}
		setState((prev) => ({
			...prev,
			open: true,
		}));
	}, [onOpen]);

	const handleToggle = useCallback(() => {
		if (onToggle) {
			onToggle();
		}
		setState((prev) => ({
			...prev,
			open: !prev.open,
		}));
	}, [onToggle]);

	const handleClick = useCallback(
		(e) => {
			console.log("handleClick", state.selected);
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
		console.log("handleClose")
		if (onClose) {
			onClose();
		}
		setState((prev) => ({ ...prev, open: false }));
	}, [onClose]);

	const handleItemClick = useCallback(
		(e, item) => {
			e.stopPropagation();
			console.log("handleItemClick", item);
			handleClose();
			if (clickOnSelect) {
				if (onItemClick) {
					onItemClick(item);
				} else {
					console.warn("onItemClick is not defined, trigger stopped");
				}
			}
		},
		[handleClose, clickOnSelect, onItemClick]
	);

	const _label = useMemo(() => {
		return getLabel
			? getLabel(state.selected) || label
			: state.selected
	}, [getLabel, label, state.selected])

	const _open = useMemo(() => {
		return open != null ? open : state.open
	}, [open, state.open])

	return (
		<>
			<ButtonGroup
				variant="contained"
				size={size}
				ref={anchorRef}
				aria-label="doc type"
				onMouseEnter={hoverToOpen ? handleOpen : undefined}
				// onMouseLeave={hoverToOpen ? handleClose : undefined}

				{...rest}>
				<Button
					size={size}
					onClick={handleClick}
					startIcon={getIcon ? getIcon(state.selected) : null}
					sx={[
						{
							...(dense && {
								paddingLeft: 1,
								paddingRight: 1,
							}),
							...(noGutter && {
								"&.MuiButtonGroup-grouped:not(:last-of-type)": {
									borderRight: 0,
								},
							}),
						},
					]}>
					{slotProps?.typography ? (<Typography variant={slotProps?.typography?.variant}>{_label}</Typography>) : _label}
				</Button>
				<Button
					size={size}
					onClick={handleToggle}
					sx={[{
						...(dense && {
							"&.MuiButtonGroup-grouped": {
								paddingLeft: 0,
								paddingRight: 0,
								minWidth: "20px",

							}
						}),
						// ...(size === "small" && {
						// 	"&.MuiButtonGroup-grouped": {
						// 		minWidth: "20px",
						// 		paddingLeft: "4px",
						// 		paddingRight: "4px",
						// 	},
						// }),
					}
					]}>
					<IconComponent fontSize="small" />
				</Button>

			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
					minWidth: anchorRef.current?.clientWidth || "5rem",
				}}

				open={_open}
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
						<Paper {...slotProps?.paper} onMouseLeave={hoverToOpen ? handleClose : undefined}>

							<>
								{loading && <LoadingTypography />}
								{options && (<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu" autoFocusItem>

										{
											options.map((item, index) => {
												const itemKey = getOptionKey ? getOptionKey(item) : item.key;
												const itemLabel = getOptionLabel ? getOptionLabel(item) : item.label;
												return (
													<MenuItem
														key={itemKey}
														selected={isOptionEqualToValue ? isOptionEqualToValue(state.selected, item) : state.selected == item}
														onClick={(e) =>
															handleItemClick(
																e,
																item
															)
														}>
														{item.icon && (
															<ListItemIcon>
																{item.icon}
															</ListItemIcon>
														)}

														<ListItemText>
															{itemLabel}
														</ListItemText>
													</MenuItem>
												);
											})}
									</MenuList>
								</ClickAwayListener>)}
							</>

						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}));
SplitButton.displayName = "SplitButton";
SplitButton.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	onItemClick: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onToggle: PropTypes.func,
	noGutter: PropTypes.bool,
	dense: PropTypes.bool,
	loading: PropTypes.bool,
	open: PropTypes.bool,
	openOnClick: PropTypes.bool,
	clickOnSelect: PropTypes.bool,
	getLabel: PropTypes.func,
	getIcon: PropTypes.func,
	getData: PropTypes.func,
	isOptionEqualToValue: PropTypes.func,
	getOptionKey: PropTypes.func,
	getOptionLabel: PropTypes.func,
	size: PropTypes.string,
	defaultSelected: PropTypes.object,
	options: PropTypes.array,
	slotProps: PropTypes.object,
	hoverToOpen: PropTypes.bool,
	IconComponent: PropTypes.elementType
}
export default SplitButton;

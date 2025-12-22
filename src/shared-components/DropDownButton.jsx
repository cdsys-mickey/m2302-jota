import Colors from "@/modules/Colors.mjs";
import useDebounceState from "@/shared-hooks/useDebounceState";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
	Tooltip,
	Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo, useRef, useState } from "react";
import LoadingTypography from "./LoadingTypography";
import { Box } from "@mui/system";
import TooltipWrapper from "./TooltipWrapper/TooltipWrapper";


const DropDownButton = memo(forwardRef((props, ref) => {
	const {
		size = "medium",
		defaultSelected,
		openOnClick = false,
		excludeSelected = false,
		getLabel,
		open: _open,
		getItemIconComponent,
		options,
		isOptionEqualToValue,
		getOptionKey,
		getOptionLabel,
		label = "請選擇",
		noGutter = false,
		dense = false,
		loading,
		slotProps,
		// METHODS
		onClick,
		onItemClick,
		onSelect,
		onSubmit,
		onOpen,
		onClose,
		onToggle,
		hoverToOpen,
		split,
		IconComponent = ArrowDropDownIcon,
		color,
		leftButtons,
		title,
		disabled,
		...rest
	} = props;

	const anchorRef = useRef(null);

	// const [state, setState] = useState({
	// 	// open: open,
	// 	selected: defaultSelected,
	// });
	const [selected, setSelected] = useState(defaultSelected);
	const [open, setOpen] = useState(_open == null ? false : _open);
	const [debouncedOpen, setDebouncedOpen] = useDebounceState(open);

	const handleOpen = useCallback(() => {
		if (onOpen) {
			onOpen();
		} else {
			setDebouncedOpen(true);
		}
	}, [onOpen, setDebouncedOpen]);

	const handleToggle = useCallback(() => {
		if (onToggle) {
			onToggle();
		}
		setDebouncedOpen(prev => !prev);
	}, [onToggle, setDebouncedOpen]);

	const handleClick = useCallback(
		(e) => {
			console.log("handleClick", selected);
			e.stopPropagation();
			if (!selected && openOnClick) {
				handleOpen();
				return;
			}
			const clickMethod = onClick || onSelect;

			if (clickMethod) {
				clickMethod(selected);
			}
			if (onSubmit) {
				onSubmit();
			}
		},
		[handleOpen, onClick, onSelect, onSubmit, openOnClick, selected]
	);

	const handleClose = useCallback((e, opts = {}) => {
		const { debounce = false } = opts;
		console.log("button.handleClose", opts)
		if (onClose) {
			onClose(e);
		} else {
			if (debounce) {
				setOpen(false);
			} else {
				setDebouncedOpen(false);
			}
		}
	}, [onClose, setDebouncedOpen]);

	const handleItemClick = useCallback(
		(e, item) => {
			e.stopPropagation();
			console.log("handleItemClick", item);
			handleClose();
			setSelected(item);

			const clickMethod = onItemClick || onSelect;

			if (clickMethod) {
				clickMethod(item);
			} else {
				console.warn("onItemClick is not defined, trigger stopped");
			}
			if (onSubmit) {
				onSubmit();
			}
		},
		[handleClose, onItemClick, onSelect, onSubmit]
	);

	const _label = useMemo(() => {
		return getLabel
			? getLabel(selected) || label
			: selected
	}, [getLabel, label, selected])

	const popperOpen = useMemo(() => {
		return _open != null ? _open : debouncedOpen
	}, [_open, debouncedOpen])

	const buttonGroupOnMouseEnter = useMemo(() => {
		return hoverToOpen ? handleOpen : undefined
	}, [handleOpen, hoverToOpen])

	const buttonGroupOnMouseLeave = useMemo(() => {
		return hoverToOpen ? (e) => handleClose(e, { debounce: true }) : undefined
	}, [handleClose, hoverToOpen])

	const StartIconComponent = useMemo(() => {
		return (selected && getItemIconComponent) ? getItemIconComponent(selected) : null;
	}, [getItemIconComponent, selected])

	const showSplit = useMemo(() => {
		return split && options?.length > 1;
	}, [options?.length, split])

	const showOptions = useMemo(() => {
		return loading == false && options;
	}, [loading, options])

	return (
		<>
			<ButtonGroup
				// variant="contained"
				size={size}
				ref={anchorRef}
				aria-label="doc type"
				onMouseEnter={buttonGroupOnMouseEnter}
				onMouseLeave={buttonGroupOnMouseLeave}
				sx={{
					// alignItems: "center",
					"&:hover": {
						backgroundColor: Colors.HOVER
					},
					...(dense && {
						"& .main.MuiButtonGroup-grouped": {
							paddingLeft: StartIconComponent ? 2 : 1,
							paddingRight: showSplit ? 1 : 2,
							paddingTop: "4px",
							paddingBottom: "3px",
						},
						"& .drop-down.MuiButtonGroup-grouped.MuiButtonGroup-lastButton ": {
							paddingLeft: 0,
							paddingRight: 0,
							minWidth: "20px",
							paddingTop: "6px",
							paddingBottom: "6px",
						},
						"& .MuiButtonGroup-grouped .MuiButton-endIcon": {
							marginLeft: 0
						}
					}),
					...(noGutter && {
						"& .MuiButtonGroup-grouped .MuiButtonGroup-firstButton": {
							borderRight: 0,
						}
					})
				}}
				color={color}
				disabled={disabled}
				{...rest}>
				{leftButtons}
				<TooltipWrapper title={title}>
					<Button
						size={size}
						onClick={handleClick}
						startIcon={StartIconComponent ? <StartIconComponent fontSize="small" /> : null}
						className="main"
						{...(IconComponent && !split && ({
							endIcon: (
								<IconComponent fontSize="small"
									htmlColor={color}
								/>
							)
						}))}
						sx={[
							{
								...(noGutter && {
									"&.MuiButtonGroup-grouped:not(:last-of-type)": {
										borderRight: 0,
									},
								}),
							},
						]}
						{...slotProps?.button}>
						{/* {_label} */}
						{slotProps?.typography
							? (
								<Typography variant={slotProps?.typography?.variant}
									sx={{
										whiteSpace: "nowrap",
										...(color && {
											color
										})
									}}
								>
									{_label}
								</Typography>)
							: _label}
					</Button>
				</TooltipWrapper>
				{showSplit && (
					<Button
						size={size}
						onClick={handleToggle}
						className="drop-down"
						sx={[{

						}
						]}>
						<IconComponent fontSize="small" htmlColor={color} {...slotProps?.dropdownButton?.icon} />
					</Button>
				)}
			</ButtonGroup>
			<Popper
				sx={[
					theme => ({
						zIndex: theme.zIndex.tooltip,
						minWidth: anchorRef.current?.clientWidth || "5rem",
					}),
					...(Array.isArray(slotProps?.popper?.sx)
						? slotProps.popper.sx
						: [slotProps?.popper?.sx].filter(Boolean)),
				]}

				open={popperOpen}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				{...slotProps?.popper}>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom"
									? "center top"
									: "center bottom",
						}}>
						<Paper {...slotProps?.paper}
							onMouseEnter={hoverToOpen ? handleOpen : undefined}
							onMouseLeave={hoverToOpen ? handleClose : undefined}
							{...slotProps?.paper}>

							<>
								{loading && (
									<Box p={2}>
										<LoadingTypography />
									</Box>
								)}
								{showOptions && (
									<ClickAwayListener onClickAway={handleClose}>
										<MenuList id="split-button-menu" autoFocusItem>
											{
												options
													.filter(item => {
														if (excludeSelected) {
															return isOptionEqualToValue ? !isOptionEqualToValue(selected, item) : selected != item;
														}
														return true;
													})
													.map((item, index) => {
														const itemKey = getOptionKey ? getOptionKey(item) : item.key;
														const itemLabel = getOptionLabel ? getOptionLabel(item) : item.label;
														const ItemIconComponent = getItemIconComponent ? getItemIconComponent(item) : null;
														return (
															<MenuItem
																key={itemKey || index}
																selected={isOptionEqualToValue ? isOptionEqualToValue(selected, item) : selected == item}
																onClick={(e) =>
																	handleItemClick(
																		e,
																		item
																	)
																}>
																{ItemIconComponent && (
																	<ListItemIcon>
																		<ItemIconComponent />
																	</ListItemIcon>
																)}

																<ListItemText>
																	{itemLabel}
																</ListItemText>
															</MenuItem>
														);
													})}
										</MenuList>
									</ClickAwayListener>
								)}
							</>

						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
}));
DropDownButton.displayName = "DropDownButtonView";
DropDownButton.propTypes = {
	label: PropTypes.string,
	onSelect: PropTypes.func,
	onClick: PropTypes.func,
	onItemClick: PropTypes.func,
	onSubmit: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onToggle: PropTypes.func,
	noGutter: PropTypes.bool,
	dense: PropTypes.bool,
	loading: PropTypes.bool,
	open: PropTypes.bool,
	openOnClick: PropTypes.bool,
	getLabel: PropTypes.func,
	getItemIconComponent: PropTypes.func,
	getOptions: PropTypes.func,
	isOptionEqualToValue: PropTypes.func,
	getOptionKey: PropTypes.func,
	getOptionLabel: PropTypes.func,
	size: PropTypes.string,
	defaultSelected: PropTypes.object,
	options: PropTypes.array,
	slotProps: PropTypes.object,
	hoverToOpen: PropTypes.bool,
	split: PropTypes.bool,
	excludeSelected: PropTypes.bool,
	IconComponent: PropTypes.elementType,
	color: PropTypes.string,
	leftButtons: PropTypes.node,
	title: PropTypes.string
}
export default DropDownButton;

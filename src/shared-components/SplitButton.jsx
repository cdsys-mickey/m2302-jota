import Colors from "@/modules/md-colors";
import useDebounceState from "@/shared-hooks/useDebounceState";
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
import { Box } from "@mui/system";


const SplitButton = memo(forwardRef((props, ref) => {
	const {
		size = "medium",
		defaultSelected,
		openOnClick = false,
		getLabel,
		open: _open,
		getIcon,
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
		onSelect,
		onOpen,
		onClose,
		onToggle,
		hoverToOpen,
		IconComponent = ArrowDropDownIcon,
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
		}
		// setState((prev) => ({
		// 	...prev,
		// 	open: true,
		// }));
		setDebouncedOpen(true);
	}, [onOpen, setDebouncedOpen]);

	const handleToggle = useCallback(() => {
		if (onToggle) {
			onToggle();
		}
		// setState((prev) => ({
		// 	...prev,
		// 	open: !prev.open,
		// }));
		setOpen(prev => !prev);
	}, [onToggle]);

	const handleClick = useCallback(
		(e) => {
			console.log("handleClick", selected);
			if (!selected && openOnClick) {
				handleOpen();
				return;
			}
			if (onClick) {
				onClick(e, selected);
			}
		},
		[handleOpen, onClick, openOnClick, selected]
	);

	const handleClose = useCallback((e, opts = {}) => {
		const { debounce = false } = opts;
		console.log("button.handleClose", opts)
		if (onClose) {
			onClose(e);
		}
		// setState((prev) => ({ ...prev, open: false }));
		if (debounce) {
			setOpen(false);
		} else {
			setDebouncedOpen(false);
		}
	}, [onClose, setDebouncedOpen]);

	const handleItemClick = useCallback(
		(e, item) => {
			e.stopPropagation();
			console.log("handleItemClick", item);
			handleClose();
			setSelected(item);
			if (onSelect) {
				onSelect(item);
			} else {
				console.warn("onSelect is not defined, trigger stopped");
			}
		},
		[handleClose, onSelect]
	);

	const _label = useMemo(() => {
		return getLabel
			? getLabel(selected) || label
			: selected
	}, [getLabel, label, selected])

	const isPopperOpen = useMemo(() => {
		return _open != null ? _open : debouncedOpen
	}, [_open, debouncedOpen])

	return (
		<>
			<ButtonGroup
				variant="contained"
				size={size}
				ref={anchorRef}
				aria-label="doc type"
				onMouseEnter={hoverToOpen ? handleOpen : undefined}
				onMouseLeave={hoverToOpen ? (e) => handleClose(e, { debounce: true }) : undefined}
				sx={{
					"&:hover": {
						backgroundColor: Colors.HOVER
					},
					...(dense && {
						"& .main.MuiButtonGroup-grouped": {
							paddingLeft: 1,
							paddingRight: 1,
						},
						"& .drop-down.MuiButtonGroup-grouped": {
							paddingLeft: 0,
							paddingRight: 0,
							minWidth: "20px",
						}
					}),
				}}
				// onMouseLeave={hoverToOpen ? handleClose : undefined}

				{...rest}>
				<Button
					size={size}
					onClick={handleClick}
					startIcon={getIcon ? getIcon(selected) : null}
					className="main"
					sx={[
						{
							...(noGutter && {
								"&.MuiButtonGroup-grouped:not(:last-of-type)": {
									borderRight: 0,
								},
							}),
						},
					]}>
					{slotProps?.typography ? (<Typography variant={slotProps?.typography?.variant} sx={{
						whiteSpace: "nowrap"
					}}>{_label}</Typography>) : _label}
				</Button>
				<Button
					size={size}
					onClick={handleToggle}
					className="drop-down"
					sx={[{

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

				open={isPopperOpen}
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
						<Paper {...slotProps?.paper}
							onMouseEnter={hoverToOpen ? handleOpen : undefined}
							onMouseLeave={hoverToOpen ? handleClose : undefined}>

							<>
								{loading && (
									<Box p={1}>
										<LoadingTypography />
									</Box>
								)}
								{options && (<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu" autoFocusItem>

										{
											options.map((item, index) => {
												const itemKey = getOptionKey ? getOptionKey(item) : item.key;
												const itemLabel = getOptionLabel ? getOptionLabel(item) : item.label;
												return (
													<MenuItem
														key={itemKey}
														selected={isOptionEqualToValue ? isOptionEqualToValue(selected, item) : selected == item}
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
	onSelect: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onToggle: PropTypes.func,
	noGutter: PropTypes.bool,
	dense: PropTypes.bool,
	loading: PropTypes.bool,
	open: PropTypes.bool,
	openOnClick: PropTypes.bool,
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

import React, { useCallback, useMemo, useRef } from "react";
import {
	styled,
	alpha,
	InputBase,
	ClickAwayListener,
	Popper,
	Box,
	Tooltip,
	IconButton,
	Button,
	Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Layouts from "@/shared-modules/layouts";
import TuneIcon from "@mui/icons-material/Tune";

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const OUT_STYLE =
	"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)";

const IN_STYLE =
	"inset 0px 2px 1px -1px rgba(0,0,0,0.2), inset 0px 1px 1px 0px rgba(0,0,0,0.14), inset 0px 1px 3px 0px rgba(0,0,0,0.12)";

/**
 * shadowStyle: in, out
 * shadow: always, focus
 */
const StyledInputBase = styled(InputBase, {
	shouldForwardProp: (prop) =>
		!`width,square,shadowStyle,shadow,backgroundColor,hoverBackgroundColor,focusBackgroundColor`
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(
	({
		theme,
		width = "20ch",
		square = false,
		shadowStyle,
		shadow = "always",
		backgroundColor = "rgb(0 0 0 / 5%)",
		hoverBackgroundColor,
		focusBackgroundColor,
		breakpoint = "md",
	}) => {
		const alwaysIn = useMemo(
			() => shadowStyle === "in" && shadow === "always",
			[shadow, shadowStyle]
		);

		const alwaysOut = useMemo(
			() => shadowStyle === "out" && shadow === "always",
			[shadow, shadowStyle]
		);

		const focusIn = useMemo(
			() => shadowStyle === "in" && shadow === "focus",
			[shadow, shadowStyle]
		);

		const focusOut = useMemo(
			() => shadowStyle === "out" && shadow === "focus",
			[shadow, shadowStyle]
		);

		return {
			color: "inherit",
			border: "rgba(0, 0, 0, 0.12)",
			"& .MuiInputBase-input": {
				padding: theme.spacing(1, 1, 1, 0),
				// vertical padding + font size from searchIcon
				paddingLeft: `calc(1em + ${theme.spacing(4)})`,
				// transition: theme.transitions.create("width"),
				transition: theme.transitions.create([
					"box-shadow",
					"width",
					"background-color",
				]),
				width: "100%",
				[theme.breakpoints.up(breakpoint)]: {
					width: width,
				},
				...(alwaysIn && {
					boxShadow: IN_STYLE,
				}),
				...(alwaysOut && {
					boxShadow: OUT_STYLE,
				}),
				borderRadius: square ? theme.shape.borderRadius : "36px",
			},
			"& input": {
				backgroundColor,
			},
			"& .MuiInputBase-input:hover": {
				backgroundColor: hoverBackgroundColor || backgroundColor,
			},
			"& .MuiInputBase-input:focus": {
				backgroundColor: focusBackgroundColor || backgroundColor,
				...(focusIn && {
					// boxShadow: "inset 1px 2px 4px rgb(0 0 0 / 29%)",
					boxShadow: IN_STYLE,
				}),
				...(focusOut && {
					boxShadow: OUT_STYLE,
				}),
			},
		};
	}
);

const SearchFieldBorder = styled("div")(({ theme }) => ({
	position: "relative",
	// borderRadius: theme.shape.borderRadius,
	// backgroundColor: alpha(theme.palette.common.white, 0.15),
	// "&:hover": {
	// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
	// },
	marginRight: 0,
	marginLeft: theme.spacing(0.5),
	width: "100%",
	// transition: theme.transitions.create("background-color ", {
	// 	easing: theme.transitions.easing.sharp,
	// 	duration: theme.transitions.duration.leavingScreen,
	// }),
}));

export const SearchField = React.forwardRef((props, ref) => {
	const {
		focusShadow = false,
		// InputBase
		inputRef,
		name = "q",
		value = "",
		onChange,
		placeholder,
		extraEndAdorment,
		filtered,
		// onClear,
		// Popper
		PopperComponent,
		popper,
		popperId,
		popperClickAway = true,
		onPopperOpen,
		onPopperClose,
		popperOpen,
		...rest
	} = props;

	const doRenderPopper = useMemo(
		() => popper || PopperComponent,
		[PopperComponent, popper]
	);

	const showClearButton = useMemo(() => {
		return value !== "" && !popperOpen;
	}, [popperOpen, value]);

	const handleClear = useCallback(
		(e) => {
			console.log("handleClear");
			onChange(e, "");
			if (inputRef.current) {
				inputRef.current.focus();
			}
		},
		[inputRef, onChange]
	);

	return (
		<div ref={ref}>
			<SearchFieldBorder focusShadow={focusShadow}>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					autoComplete="off"
					inputRef={inputRef}
					inputProps={{ "aria-label": "search" }}
					placeholder={placeholder}
					endAdornment={
						<Box
							sx={{
								whiteSpace: "nowrap",
								position: "absolute",
								right: "4px",
							}}
							className="right-box">
							{extraEndAdorment}
							<Tooltip title={value ? "清除" : ""}>
								<IconButton
									// onClick={handleQueryStringClear}
									onClick={handleClear}
									color="inherit"
									size="small"
									sx={[
										(theme) => ({
											visibility: "hidden",
											opacity: 0,
											transition:
												theme.transitions.create(
													"opacity",
													{
														easing: theme
															.transitions.easing
															.sharp,
														duration:
															theme.transitions
																.duration
																.leavingScreen,
													}
												),
										}),
										showClearButton && {
											opacity: 100,
											visibility: "visible",
										},
									]}>
									<ClearIcon
										color="action"
										fontSize="small"
										position="end"
									/>
								</IconButton>
							</Tooltip>
							{onPopperOpen && (
								<Tooltip title={popperOpen ? "" : "進階搜尋"}>
									<IconButton
										color="inherit"
										size="small"
										sx={
											[
												// (theme) => ({
												// 	opacity: 0,
												// 	transition:
												// 		theme.transitions.create(
												// 			"opacity",
												// 			{
												// 				easing: theme
												// 					.transitions
												// 					.easing
												// 					.sharp,
												// 				duration:
												// 					theme
												// 						.transitions
												// 						.duration
												// 						.leavingScreen,
												// 			}
												// 		),
												// }),
												// !popperOpen && {
												// 	opacity: 100,
												// },
											]
										}
										onClick={onPopperOpen}>
										<TuneIcon
											position="end"
											// color="action"
											color={
												filtered ? "primary" : "inherit"
											}
										/>
									</IconButton>
								</Tooltip>
							)}
						</Box>
					}
					{...rest}
				/>
				{/* hidden submit button for default form submission */}
				<Button type="submit" sx={{ display: "none" }} />
			</SearchFieldBorder>
			{doRenderPopper && (
				<ClickAwayListener
					onClickAway={() => {
						if (popperClickAway) {
							if (onPopperClose) {
								onPopperClose();
							} else {
								console.error("onPopperClose not specified");
							}
						}
					}}
					mouseEvent="onMouseDown">
					<Popper
						sx={{ zIndex: Layouts.Z_INDEX_POPPER }}
						id={popperId}
						open={popperOpen}
						anchorEl={inputRef.current}
						// disablePortal is required for default form submission action
						disablePortal
						// transition
						placement="bottom-start">
						{({ TransitionProps }) => (
							<Fade {...TransitionProps}>
								<PopperComponent />
							</Fade>
						)}
					</Popper>
				</ClickAwayListener>
			)}
		</div>
	);
});

export default React.memo(SearchField);

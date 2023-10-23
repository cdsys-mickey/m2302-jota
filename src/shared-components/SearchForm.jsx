import useResponsive from "@/shared-contexts/useResponsive";
import Layouts from "@/shared-modules/layouts";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
	ClickAwayListener,
	Divider,
	Fade,
	IconButton,
	Paper,
	Popper,
	Tooltip,
} from "@mui/material";
import { memo, useMemo, useRef } from "react";
import ControlledInputBase from "./controlled/ControlledInputBase";

const SearchForm = memo((props) => {
	const {
		placeholder,
		width,
		sx = [],
		square = false,
		rightSquare = false,
		fullWidth = false,
		borderRadius,
		// input
		fieldName,
		onClear,
		inputRef,
		filtered,
		// Popper
		PopperComponent,
		popper,
		popperId = "search",
		popperClickAway = true,
		onPopperToggle,
		onPopperOpen,
		onPopperClose,
		popperOpen,
		// Responsive
		responsive = false,
		mobilePlaceholder,
		...rest
	} = props;
	const { mobile } = useResponsive();
	const paperRef = useRef(null);

	const doExpand = useMemo(() => responsive && mobile, [mobile, responsive]);

	const doWidth = useMemo(() => !doExpand && width, [doExpand, width]);

	const doRenderPopper = useMemo(
		() => (popper || PopperComponent) && onPopperOpen,
		[PopperComponent, onPopperOpen, popper]
	);

	const placeholderText = useMemo(() => {
		if (mobile) {
			return mobilePlaceholder || placeholder;
		}
		return placeholder;
	}, [mobile, mobilePlaceholder, placeholder]);

	return (
		<>
			<Paper
				component="form"
				ref={paperRef}
				// ref={inputRef}
				sx={[
					(theme) => ({
						display: "flex",
						...(doExpand && {
							flex: 1,
						}),

						alignItems: "center",
						p: "2px",
						...(square && {
							borderRadius: "4px",
						}),
						...(borderRadius && {
							borderRadius: borderRadius,
						}),
						...(rightSquare && {
							borderTopRightRadius: "4px",
							borderBottomRightRadius: "4px",
						}),
						...(doWidth && {
							width: width,
						}),
						...(fullWidth && {
							width: "100%",
						}),
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<IconButton
					type="button"
					sx={{
						p: "8px",
						...(square && {
							borderRadius: "4px",
						}),
						...(borderRadius && {
							borderRadius: borderRadius,
						}),
					}}
					aria-label="search">
					<SearchIcon />
				</IconButton>
				<ControlledInputBase
					name={fieldName}
					inputRef={inputRef}
					sx={(theme) => ({
						ml: 1,
						flex: 1,
						transition: theme.transitions.create("width"),
					})}
					placeholder={placeholderText}
					inputProps={{ "aria-label": placeholder }}
					onClear={onClear}
					{...rest}
				/>

				{doRenderPopper && (
					<>
						<Divider
							sx={{ height: 28, m: 0.5 }}
							orientation="vertical"
						/>
						<Tooltip title={popperOpen ? "" : "進階搜尋"}>
							<IconButton
								color="inherit"
								size="small"
								disabled={popperOpen}
								onClick={onPopperToggle}>
								<TuneIcon
									position="end"
									// color="action"
									color={filtered ? "primary" : "inherit"}
									// color={popperOpen ? "primary" : "inherit"}
								/>
							</IconButton>
						</Tooltip>
					</>
				)}
				{doRenderPopper && (
					<ClickAwayListener
						onClickAway={() => {
							if (popperClickAway) {
								if (onPopperClose) {
									onPopperClose();
								} else {
									console.error(
										"onPopperClose not specified"
									);
								}
							} else {
								console.log("popperClickAway = false");
							}
						}}
						mouseEvent="onMouseDown">
						<Popper
							sx={{
								zIndex: Layouts.Z_INDEX_POPPER,
							}}
							id={popperId}
							open={popperOpen}
							anchorEl={paperRef.current}
							// disablePortal is required for default form submission action
							disablePortal
							// transition
							placement="bottom-start">
							{({ TransitionProps }) => (
								<Fade {...TransitionProps}>
									<PopperComponent width={width} />
								</Fade>
							)}
						</Popper>
					</ClickAwayListener>
				)}
			</Paper>
		</>
	);
});

SearchForm.displayName = "SearchForm";
export default SearchForm;

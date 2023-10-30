import Layouts from "@/shared-modules/layouts";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
	Box,
	Button,
	ClickAwayListener,
	Fade,
	IconButton,
	Popper,
	Tooltip,
	styled,
} from "@mui/material";
import { forwardRef, memo, useCallback, useMemo } from "react";
import SearchFieldBorder from "./SearchFieldBorder";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import PropTypes from "prop-types";

/**
 * shadowStyle: in, out
 * shadow: always, focus
 */

const SearchField = memo(
	forwardRef((props, ref) => {
		const {
			focusShadow = false,
			// InputBase
			inputRef,
			name = "q",
			value = "",
			placeholder,
			extraEndAdorment,
			filtered,
			searchIconPlacement = "left",
			// METHODS
			onChange,
			onClear,
			onSubmit,
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

		const showSearchIcon = useMemo(() => {
			return (
				searchIconPlacement === "left" ||
				searchIconPlacement === "right"
			);
		}, [searchIconPlacement]);

		return (
			<div ref={ref}>
				<SearchFieldBorder focusShadow={focusShadow}>
					{showSearchIcon && (
						<SearchIconWrapper placement={searchIconPlacement}>
							<SearchIcon onClick={onSubmit} />
						</SearchIconWrapper>
					)}

					<StyledInputBase
						id={name}
						searchIconPlacement={searchIconPlacement}
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
									...(searchIconPlacement === "right" && {
										right: "36px",
									}),
								}}
								className="right-box">
								{extraEndAdorment}
								<Tooltip title={value ? "清除" : ""}>
									<IconButton
										// onClick={handleQueryStringClear}
										onClick={onClear}
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
																.transitions
																.easing.sharp,
															duration:
																theme
																	.transitions
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
									<Tooltip
										title={popperOpen ? "" : "進階搜尋"}>
										<IconButton
											color="inherit"
											size="small"
											onClick={onPopperOpen}>
											<TuneIcon
												position="end"
												// color="action"
												color={
													filtered
														? "primary"
														: "inherit"
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
					{/* <Button type="submit" sx={{ display: "none" }} /> */}
					<input type="submit" style={{ display: "none" }} />
				</SearchFieldBorder>
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
	})
);
SearchField.propTypes = {
	searchIconPlacement: PropTypes.oneOf(["left", "right", "none"]),
};
export default SearchField;

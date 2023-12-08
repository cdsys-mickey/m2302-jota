import Layouts from "@/shared-modules/md-layouts";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import {
	Box,
	ClickAwayListener,
	Divider,
	Fade,
	IconButton,
	Paper,
	Popper,
	Tooltip,
	InputBase,
	FormHelperText,
} from "@mui/material";
import { memo, useMemo, useRef } from "react";
import ControlledInputBase from "../controlled/ZZControlledInputBaseEx";
import { useContext } from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";
import FlexBox from "@/shared-components/FlexBox";
import InputBaseEx from "../input-ex/InputBaseEx";
import ClearInputButton from "../input/ClearInputButton";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const renderPaperStyles = ({
	responsive,
	mobile,
	width,
	square,
	borderRadius,
	rightSquare,
	fullWidth,
}) => {
	const doFlex = responsive && mobile;
	const doWidth = !doFlex && width;

	return {
		display: "flex",
		...(doFlex && {
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
	};
};

const SearchField = memo(
	forwardRef((props, ref) => {
		const {
			helperText,
			value,
			onChange,
			mobile,
			placeholder,
			width,
			sx = [],
			square = false,
			rightSquare = false,
			fullWidth = false,
			borderRadius,
			// Box
			BoxProps,
			// Paper
			PaperProps,
			// Input
			inputProps,
			// input
			name,
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
			onSubmit,
			...rest
		} = props;

		const paperRef = useRef(null);

		const paperStyles = useMemo(
			() =>
				renderPaperStyles({
					responsive,
					mobile,
					width,
					square,
					borderRadius,
					rightSquare,
					fullWidth,
				}),
			[
				borderRadius,
				fullWidth,
				mobile,
				responsive,
				rightSquare,
				square,
				width,
			]
		);

		// const doFlex = useMemo(
		// 	() => responsive && mobile,
		// 	[mobile, responsive]
		// );

		// const doWidth = useMemo(() => !doFlex && width, [doFlex, width]);

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
			<Box ref={ref}>
				<Paper
					// component="form"
					ref={paperRef}
					// ref={inputRef}

					sx={[paperStyles, ...(Array.isArray(sx) ? sx : [sx])]}
					onSubmit={onSubmit}
					noValidate
					autoComplete="off">
					<FlexBox px={0.5} {...BoxProps}>
						<IconButton
							type="button"
							sx={{
								p: "5px",
								// ...(square && {
								// 	borderRadius: "4px",
								// }),
								// ...(borderRadius && {
								// 	borderRadius: borderRadius,
								// }),
							}}
							aria-label="search">
							<SearchIcon />
						</IconButton>
						<InputBase
							name={name}
							inputRef={inputRef}
							// inputRef={ref}
							value={value}
							onChange={onChange}
							sx={(theme) => ({
								ml: 0.5,
								flex: 1,
								transition: theme.transitions.create("width"),
								"& input": {
									padding: 0,
								},
							})}
							placeholder={placeholderText}
							inputProps={{
								"aria-label": placeholder,
								...inputProps,
							}}
							endAdornment={
								<ClearInputButton
									value={value}
									onChange={onChange}
								/>
							}
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
											color={
												filtered ? "primary" : "inherit"
											}
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
					</FlexBox>
				</Paper>
				{helperText && (
					<FormHelperText error>{helperText}</FormHelperText>
				)}
			</Box>
		);
	})
);

SearchField.displayName = "SearchField";
SearchField.propTypes = {
	mobile: PropTypes.bool,
};
export default SearchField;

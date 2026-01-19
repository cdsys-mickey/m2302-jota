import { Box, styled } from "@mui/material";
import { useMemo } from "react";

const OptionPickerBox = styled(Box, {
	shouldForwardProp: (prop) =>
		![
			"focusedBackgroundColor",
			"size",
			"hideBorders",
			"hideControls",
			// "hidePopupIndicator",
			// "disablePointerEvents",
			"disableFadeOut",
			"disableClearable",
			"disabled",
		].includes(prop),
})(
	({
		theme,
		focusedBackgroundColor,
		size,
		hideBorders,
		width,
		// hidePopupIndicator,
		// disablePointerEvents,
		disableClearable,
		hideControls,
		disableFadeOut,
		disabled,
	}) => {

		const _hideControls = useMemo(() => {
			// return hideControls || disabled || disableClearable;
			return hideControls || disabled;
		}, [disabled, hideControls])

		return ({
			/**
			 * *** DSG adaptive support ****
			 **/
			...(hideBorders && {
				"& fieldset": { border: "none" },
			}),
			...(hideControls && {
				"& .MuiAutocomplete-popupIndicator": {
					opacity: 0,
				},
				pointerEvents: "none",
			}),
			...(_hideControls && {
				"& .MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
				{
					paddingRight: 0,
				},
				"& .MuiOutlinedInput-root": {
					paddingRight: 0,
				}
			}),
			// 隱藏清除按鈕可以再讓一些空間出來
			...(disableClearable && {
				"& .MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, & .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
				{
					paddingRight: 24,
				},
			}),
			...(disableFadeOut && {
				"& .MuiInputBase-input.Mui-disabled": {
					color: "initial",
					// "-webkit-text-fill-color": "initial",
					textFillColor: "initial",
				},
			}),
			// "& .MuiInputBase-input.Mui-disabled": {
			// 	color: "initial",
			// 	"-webkit-text-fill-color": "initial",
			// },
			// others
			"& .MuiAutocomplete-groupLabel": {
				backgroundColor: theme.palette.primary.main,
				...(size === "small" && {
					lineHeight: "30px",
				}),
			},
			"& .MuiAutocomplete-option[data-focus=true]": {
				backgroundColor: focusedBackgroundColor || "#b6f0ff",
			},
			"& .MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-sizeSmall": {
				// paddingTop: theme.spacing(2),
			},
			"& .MuiInputBase-root .MuiChip-root": {
				marginTop: "1px",
				marginBottom: "-1px",
				marginRight: "2px",
			},
			"& ::-webkit-scrollbar": {
				width: "8px",
				borderRadius: theme.spacing(0.5),
				backgroundColor: "rgba(0, 0, 0, .03)",
			},
			"& ::-webkit-scrollbar-thumb": {
				borderRadius: theme.spacing(0.5),
				backgroundColor: "rgba(0, 0, 0, .2)",
			},
			...(!width && {
				width: "100%",
			})
		})
	}
);

export default OptionPickerBox;

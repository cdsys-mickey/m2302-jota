import { Autocomplete, Box, Paper, styled } from "@mui/material";
import React, { useMemo } from "react";
import { forwardRef } from "react";
import { memo } from "react";

const PickerPaper = (props) => {
	const { elevation = 8, ...rest } = props;
	return <Paper elevation={elevation} {...rest} />;
};

const PickerBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!["focusedBackgroundColor", "size"].includes(prop),
})(({ theme, focusedBackgroundColor, size }) => ({
	"& .MuiAutocomplete-groupLabel": {
		backgroundColor: theme.palette.primary.main,
		...(size === "small" && {
			lineHeight: "30px",
		}),
	},
	"& .MuiAutocomplete-option[data-focus=true]": {
		backgroundColor: focusedBackgroundColor || "#b6f0ff",
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
	width: "100%",
}));

const OptionsPicker = memo(
	forwardRef((props, ref) => {
		const {
			name,
			disablePortal = true,
			variant,
			// noOptionsText = "無可用選項",
			// typeToSearchText = "請輸入關鍵字進行搜尋",
			clearText = "清除",
			closeText = "收和",
			openText = "展開",
			value,
			onChange,
			multiple = false,
			ChipProps,
			filterSelectedOptions,
			disableCloseOnSelect,
			// filterMode = FilterMode.CLIENT,
			TextFieldProps,
			placeholder,
			inputRef,
			//http
			url,
			// method = "get",
			// lazy = true,
			// queryParam = "q",
			// queryRequired = false,
			// paramsJson,
			// headers,
			//
			// label,
			loadingText = "讀取中...",
			// 提供給 Input(mui) 的屬性
			InputProps,
			// 提供給 input(html) 的屬性
			inputProps,
			InputLabelProps,
			required,
			error,
			helperText,
			disabled = false,
			filterOptions,
			sortBy,
			filterBy,
			focusedBackgroundColor = "#b6f0ff",
			// debug 用
			// dontClose = false,
			// dnd = true,
			size = "small",
			sx = [],
			...rest
		} = props;

		const noOptionsTextValue = useMemo(() => {}, []);

		const filterSelectedOptionsValue = useMemo(() => {}, []);

		return (
			<PickerBox
				focusedBackgroundColor={focusedBackgroundColor}
				size={size}>
				<Autocomplete
					ref={ref}
					size={size}
					PaperComponent={PickerPaper}
					disabled={disabled}
					disablePortal={disablePortal}
					noOptionsText={noOptionsTextValue}
					clearText={clearText}
					closeText={closeText}
					openText={openText}
					multiple={multiple}
					filterSelectedOptions={filterSelectedOptionsValue}
					// disableCloseOnSelect={disableCloseOnSelectValue}
					loadingText={loadingText}
					value={value}
					sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
					{...rest}
				/>
			</PickerBox>
		);
	})
);
OptionsPicker.displayName = "OptionsPicker";
export default OptionsPicker;

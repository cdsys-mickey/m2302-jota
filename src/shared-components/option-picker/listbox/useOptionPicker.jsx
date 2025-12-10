import { ListSubheader, Typography } from "@mui/material";
import { useCallback, useState } from "react";

const LISTBOX_PADDING = 8; // px

export const useOptionPicker = () => {
	const [sharedOptionsMap, setSharedOptionsMap] = useState({});

	const updateOptions = useCallback((key, newOptions) => {
		setSharedOptionsMap((prev) => ({
			...prev,
			[key]: newOptions
		}));
		console.info(`[${key}] ${newOptions?.length ?? null} shared option(s) set`)
	}, []);

	const getOptions = useCallback((key) => sharedOptionsMap[key] || [], [sharedOptionsMap]);

	const hasOptions = useCallback((key) => {
		const options = sharedOptionsMap[key];
		return !!options && options.length > 0
	}, [sharedOptionsMap]);

	const resetOptions = useCallback(({ includes, excludes } = {}) => {
		// 若同時傳入 includes 和 excludes，警告並以 includes 優先
		if (includes != null && excludes != null) {
			console.warn(
				"resetOptions(): cannot use includes and excludes at the same time, excludes will be ignored"
			);
		}

		setSharedOptionsMap((prev) => {
			// 情況 1：只清除指定的 key
			if (Array.isArray(includes) && includes.length > 0) {
				const next = { ...prev };
				includes.forEach((k) => {
					delete next[k];
					console.warn(`shared option(s) [${k}] cleared, others are keeped`);
				});
				return next;
			}

			// 情況 2：保留指定的 key，其餘全部清除
			if (Array.isArray(excludes) && excludes.length > 0) {
				const next = {};
				excludes.forEach((k) => {
					// 安全檢查屬性是否存在於 prev 中（避免 prototype 污染）
					if (Object.prototype.hasOwnProperty.call(prev, k)) {
						next[k] = prev[k];
						console.warn(`shared options [${k}] keeped, others are cleared`);
					}
				});
				return next;
			}

			// 情況 3：兩個都沒傳 → 全部清除
			console.warn("all shared options cleared");
			return {};
		});
	}, []);

	const renderRow = useCallback((opts) => {
		// Props from React Window
		const { data, index, style } = opts;

		// Props from Autocomplete-renderOption
		const dataSet = data[index];

		const componentProps = dataSet[0];
		const optionLabel = dataSet[1];

		const inlineStyle = {
			...style,
			top: style.top + LISTBOX_PADDING,
		};

		if (dataSet.group !== undefined) {
			return (
				<ListSubheader
					key={dataSet.key}
					component="div"
					style={inlineStyle}>
					{dataSet.group}
				</ListSubheader>
			);
		}

		return (
			<Typography
				component="li"
				{...componentProps}
				noWrap
				style={inlineStyle}>
				{optionLabel}
			</Typography>
		);
	}, []);

	return {
		renderRow,
		getOptions,
		updateOptions,
		hasOptions,
		resetOptions
	};
};

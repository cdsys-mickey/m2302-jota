import PropTypes from "prop-types";

import { useWebApiOptions } from "@/shared-hooks/useWebApiOptions";
import { forwardRef, memo, useCallback, useState } from "react";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";
import OptionPicker from "./OptionPicker";

// const arePropsEqual = (oldProps, newProps) => {
// 	return Objects.arePropsEqual(oldProps, newProps, {
// 		fields: "",
// 		debug: true,
// 	});
// };

const WebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			multiple,
			name, // → for debug purpose
			onOpen,
			onClose,
			onChange,
			disabled = false,
			// for hook
			//http
			url,
			method = "get",
			lazy = true,
			queryParam = "q",
			// queryRequired = false,
			// paramsJson, //為了要讓參數被異動偵測機制判定為有異動，必須將參數序列化為 json 字串再傳進來
			querystring,
			params,
			headers,
			filterByServer = false,
			bearer,
			// for OptionPicker
			typeToSearchText,
			noOptionsText: noOptionsTextValue,
			fetchErrorText,
			triggerDelay,
			defaultOptions = [],
			// METHODS
			triggerServerFilter, // 是否驅動遠端搜尋
			getData,
			onError,
			disableClose,
			...rest
		} = props;

		console.log("rendering WebApiOptionPicker");

		const {
			open,
			// pickerState,
			loading,
			options,
			noOptionsText,
			// pickerCallback,
			onInputChange,
			resetLoading,
			lazyLoadingTriggered,
			loadOptions,
			handleOpen,
			handleClose,
		} = useWebApiOptions({
			disableClose,
			multiple,
			url,
			method,
			bearer,
			lazy,
			queryParam,
			// queryRequired,
			querystring,
			params,
			headers,
			filterByServer,

			// for OptionPicker
			typeToSearchText,
			noOptionsText: noOptionsTextValue,
			fetchErrorText,
			triggerDelay,
			defaultOptions,
			triggerServerFilter,
			getData,
			onError,
			onOpen,
			onClose,
			onChange,
		});

		// 當 filterByServer 時, 不會對輸出做任何篩選

		// const prevUrlRef = useRef();

		/**
		 * 清除 options 時機
		 * 1.filterByServer
		 * 2.pickerState.open === false
		 * 3. url 改變
		 * 4. querystring 改變
		 * 則
		 * loading === NONE
		 * query
		 */
		// useEffect(() => {
		// 	console.log(`${name} url changed -> ${url}`);
		// 	if (prevUrlRef.current !== url) {
		// 		prevUrlRef.current = url;
		// 		if (onChange) {
		// 			onChange(null, null);
		// 		}
		// 		resetLoading();
		// 	}
		// }, [url, onChange, resetLoading, name]);

		// useEffect(() => {
		// 	console.log("effect1");
		// 	if (filterByServer && !open) {
		// 		resetLoading();
		// 	}
		// }, [filterByServer, open, resetLoading]);

		// useEffect(() => {
		// 	console.log("effect2");
		// 	if (open && lazyLoadingTriggered) {
		// 		loadOptions();
		// 	}
		// }, [loadOptions, open, lazyLoadingTriggered]);

		// /**
		//  * 來源條件改變, 清空目前值, resetLoading
		//  */
		// useChangeTracking(() => {
		// 	console.log(
		// 		`url changed: ${url}${
		// 			querystring ? " " + querystring : ""
		// 		}, params:`,
		// 		params
		// 	);
		// 	onChange(multiple ? [] : null);
		// 	resetLoading();
		// }, [url, querystring, params]);

		// /** filterByServer 時, 關閉 popper 則重設 loading 狀態
		//  */
		// useChangeTracking(() => {
		// 	console.log(
		// 		"[filterByServer, open] changed:",
		// 		`${filterByServer}, ${open}`
		// 	);
		// 	if (filterByServer && !open) {
		// 		resetLoading();
		// 	}
		// }, [filterByServer, open]);

		// /**
		//  * 展開時 loadOptions
		//  */
		// useChangeTracking(() => {
		// 	console.log(
		// 		"[open, lazyLoadingTriggered] changed:",
		// 		`${open}, ${lazyLoadingTriggered}`
		// 	);
		// 	if (open && lazyLoadingTriggered) {
		// 		loadOptions();
		// 	}
		// }, [open, lazyLoadingTriggered]);

		return (
			<OptionPicker
				multiple={multiple}
				ref={ref}
				name={name}
				// loading={loading}
				// {...pickerState}
				loading={loading}
				options={options}
				noOptionsText={noOptionsText}
				disabled={disabled}
				// Controlled Props
				onInputChange={onInputChange}
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={onChange}
				{...rest}
			/>
		);
	})
);

WebApiOptionPicker.displayName = "WebApiOptionPicker";

WebApiOptionPicker.propTypes = {
	// 來自 OptionPicker
	disabled: PropTypes.bool,

	name: PropTypes.string,
	bearer: PropTypes.string,
	// METHODS
	onChange: PropTypes.func,
	ChipProps: PropTypes.object,
	filterByServer: PropTypes.bool,
	url: PropTypes.string,
	method: PropTypes.oneOf(["get", "post"]),
	lazy: PropTypes.bool,
	queryParam: PropTypes.string,
	// queryRequired: PropTypes.bool,
	querystring: PropTypes.string,
	headers: PropTypes.object,
	params: PropTypes.object,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	defaultOptions: PropTypes.array,
	triggerServerFilter: PropTypes.func,
	getData: PropTypes.func,
	onError: PropTypes.func,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	multiple: PropTypes.bool,
	disableClose: PropTypes.bool,
};

export default WebApiOptionPicker;

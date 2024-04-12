import PropTypes from "prop-types";

import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import OptionPicker from "./OptionPicker";
import { useWebApiOptions } from "@/shared-hooks/useWebApiOptions";
import { useRef } from "react";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";

const WebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			name, // → for debug purpose
			onOpen,
			onClose,
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
			headers,
			filterByServer = false,
			onChange,
			bearer,
			// for OptionPicker
			typeToSearchText,
			noOptionsText,
			fetchErrorText,
			triggerDelay,
			defaultOptions = [],
			// METHODS
			triggerServerFilter, // 是否驅動遠端搜尋
			getData,
			onError,
			...rest
		} = props;

		// console.log("rendering WebApiOptionPicker");

		const [open, setOpen] = useState(false);
		const {
			pickerState,
			pickerCallback,
			resetLoading,
			loadOptionsTriggered,
			loadOptions,
		} = useWebApiOptions({
			url,
			method,
			bearer,
			lazy,
			queryParam,
			// queryRequired,
			querystring,
			headers,
			filterByServer,

			// for OptionPicker
			typeToSearchText,
			noOptionsText,
			fetchErrorText,
			triggerDelay,
			defaultOptions,
			triggerServerFilter,
			getData,
			onError,
		});

		const handleOpen = useCallback(() => {
			if (onOpen) {
				onOpen();
			}
			setOpen(true);
		}, [onOpen]);

		const handleClose = useCallback(() => {
			if (onClose) {
				onClose();
			}
			setOpen(false);
		}, [onClose]);

		// 當 filterByServer 時, 不會對輸出做任何篩選

		const prevUrlRef = useRef();

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

		useChangeTracking(() => {
			onChange(null);
			resetLoading();
		}, [url]);

		useEffect(() => {
			if (filterByServer && !open) {
				resetLoading();
			}
		}, [filterByServer, open, resetLoading]);

		/**
		 * 空白展開時 fetch options
		 */
		useEffect(() => {
			if (open && loadOptionsTriggered) {
				loadOptions();
			}
		}, [loadOptions, open, loadOptionsTriggered]);

		return (
			<OptionPicker
				ref={ref}
				name={name}
				// loading={loading}
				{...pickerState}
				{...pickerCallback}
				disabled={disabled}
				// ChipProps={chipProps}
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
				onChange={onChange}
				// onInputChange={handleInputChange}
				// noOptionsText={noOptionsText}
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
};

export default WebApiOptionPicker;

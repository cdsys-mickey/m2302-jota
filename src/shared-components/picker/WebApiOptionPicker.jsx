import PropTypes from "prop-types";

import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import OptionPicker from "./OptionPicker";
import { useWebApiOptions } from "@/shared-hooks/useWebApiOptions";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";
import Objects from "../../shared-modules/sd-objects";

// const arePropsEqual = (oldProps, newProps) => {
// 	return Objects.arePropsEqual(oldProps, newProps, {
// 		fields: "",
// 		debug: true,
// 	});
// };

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
			noOptionsText: noOptionsTextValue,
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
			// pickerState,
			loading,
			options,
			noOptionsText,
			// pickerCallback,
			onInputChange,
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
			noOptionsText: noOptionsTextValue,
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

		useChangeTracking(() => {
			// console.log("changeTracking 1");
			onChange(null);
			resetLoading();
		}, [url]);

		// useEffect(() => {
		// 	console.log("effect1");
		// 	if (filterByServer && !open) {
		// 		resetLoading();
		// 	}
		// }, [filterByServer, open, resetLoading]);
		useChangeTracking(() => {
			// console.log("changeTracking 2");
			if (filterByServer && !open) {
				resetLoading();
			}
		}, [filterByServer, open]);

		/**
		 * 空白展開時 fetch options
		 */
		// useEffect(() => {
		// 	console.log("effect2");
		// 	if (open && loadOptionsTriggered) {
		// 		loadOptions();
		// 	}
		// }, [loadOptions, open, loadOptionsTriggered]);
		useChangeTracking(() => {
			// console.log("changeTracking 3");
			if (open && loadOptionsTriggered) {
				loadOptions();
			}
		}, [open, loadOptionsTriggered]);

		return (
			<OptionPicker
				ref={ref}
				name={name}
				// loading={loading}
				// {...pickerState}
				loading={loading}
				options={options}
				noOptionsText={noOptionsText}
				onInputChange={onInputChange}
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

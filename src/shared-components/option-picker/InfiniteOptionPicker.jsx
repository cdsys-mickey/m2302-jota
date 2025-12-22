import PropTypes from "prop-types";

import { useWebApiOptions } from "@/shared-components/option-picker/useWebApiOptions";
import { forwardRef, memo, useImperativeHandle } from "react";
import OptionPickerView from "./OptionPickerView";
import { useInfiniteOptions } from "./useInfiniteOptions";

const InfiniteOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// debug,
			multiple,
			name,
			open,
			options,
			onOpen,
			onClose,
			onChange,
			disabled: disabledByParent = false,
			// for hook
			//http
			url,
			method = "get",
			disableLazy = false,
			queryParam = "q",
			querystring,
			params,
			headers,
			filterByServer = false,
			queryRequired = false,
			bearer,
			// for OptionPicker
			typeToSearchText,
			noOptionsText,
			fetchErrorText,
			triggerDelay,
			defaultOptions = [],
			// METHODS
			triggerServerFilter, // 是否驅動遠端搜尋
			getOptions,
			onError,
			disableClose,
			disableOnSingleOption,
			// autoSelectSingleOption,
			// Enter & Tab
			// pressToFind,
			inputParam,
			findByInput,
			disableOpenOnInput,
			clearOnChange,
			clearOptionsOnChange,
			clearValueOnChange,
			mockDelay,
			sharedKey,
			...rest
		} = props;

		// console.log("rendering InfiniteOptionPicker");

		const {
			disabled,
			openPopper,
			closePopper,
			/*
			open: _open,
			onOpen: _onOpen,
			onClose: _onClose,
			onChange: _onChange,
			loading,
			options: _options,
			noOptionsText: _noOptionsText,
			onInputChange,
			findByInput: _findByInput,
			onTextChange,
			*/
			...optionsProps
		} = useInfiniteOptions({
			name,
			disableOnSingleOption,
			disableClose,
			multiple,
			url,
			options,
			method,
			bearer,
			disableLazy,
			queryParam,
			querystring,
			params,
			headers,
			filterByServer,
			queryRequired,
			// for OptionPicker
			typeToSearchText,
			noOptionsText,
			fetchErrorText,
			triggerDelay,
			defaultOptions,
			triggerServerFilter,
			getOptions,
			onError,
			open,
			onOpen,
			onClose,
			onChange,
			// autoSelectSingleOption,
			// Enter & Tab
			// pressToFind,
			inputParam,
			findByInput,
			disableOpenOnInput,
			clearOnChange,
			clearOptionsOnChange,
			clearValueOnChange,
			mockDelay,
			sharedKey
		});


		useImperativeHandle(ref, () => ({
			openPopper,
			closePopper,
		}));

		return (
			<OptionPickerView
				multiple={multiple}
				ref={ref}
				name={name}
				disabled={disabledByParent || disabled}
				disableOpenOnInput={disableOpenOnInput}
				// Controlled Props

				// open={_open}
				// onOpen={_onOpen}
				// onClose={_onClose}
				// onChange={_onChange}
				// loading={loading}
				// options={_options}
				// noOptionsText={_noOptionsText}
				// onInputChange={onInputChange}
				// findByInput={_findByInput}
				// onTextChange={onTextChange}
				{...optionsProps}

				{...rest}
			/>
		);
	})
);

InfiniteOptionPicker.displayName = "InfiniteOptionPicker";

InfiniteOptionPicker.propTypes = {
	// 來自 OptionPicker
	disabled: PropTypes.bool,

	name: PropTypes.string,
	bearer: PropTypes.string,
	// METHODS
	onChange: PropTypes.func,
	ChipProps: PropTypes.object,
	filterByServer: PropTypes.bool,
	queryRequired: PropTypes.bool,
	url: PropTypes.string,
	method: PropTypes.oneOf(["get", "post"]),
	disableLazy: PropTypes.bool,
	queryParam: PropTypes.string,
	querystring: PropTypes.string,
	headers: PropTypes.object,
	params: PropTypes.object,
	typeToSearchText: PropTypes.string,
	noOptionsText: PropTypes.string,
	fetchErrorText: PropTypes.string,
	triggerDelay: PropTypes.number,
	defaultOptions: PropTypes.array,
	triggerServerFilter: PropTypes.func,
	getOptions: PropTypes.func,
	onError: PropTypes.func,
	onClose: PropTypes.func,
	onOpen: PropTypes.func,
	multiple: PropTypes.bool,
	disableClose: PropTypes.bool,
	disableOnSingleOption: PropTypes.bool,
	autoSelectSingleOption: PropTypes.bool,
	// Enter & Tab
	open: PropTypes.bool,
	disableOpenOnInput: PropTypes.bool,
	// pressToFind: PropTypes.bool,
	clearOnChange: PropTypes.bool,
	clearValueOnChange: PropTypes.bool,
	clearOptionsOnChange: PropTypes.bool,
	findByInput: PropTypes.func,
	inputParam: PropTypes.string,
	options: PropTypes.array,
	mockDelay: PropTypes.number,
	sharedKey: PropTypes.string,
};

export default InfiniteOptionPicker;

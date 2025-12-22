import PropTypes from "prop-types";

import { useWebApiOptions } from "@/shared-components/option-picker/useWebApiOptions";
import { forwardRef, memo, useImperativeHandle } from "react";
import OptionPickerView from "./OptionPickerView";

const WebApiOptionPicker = memo(
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
			infinite = false,
			...rest
		} = props;

		// console.log("rendering WebApiOptionPicker");

		const {
			disabled,
			openPopper,
			closePopper,
			// open: _open,
			// onOpen: _onOpen,
			// onClose: _onClose,
			// onChange: _onChange,
			// loading,
			// options: _options,
			// noOptionsText: _noOptionsText,
			// onInputChange,
			// findByInput: _findByInput,
			// onTextChange
			infiniteProps,
			...optionsProps
		} = useWebApiOptions({
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
			sharedKey,
			infinite
		});


		useImperativeHandle(ref, () => ({
			openPopper,
			closePopper,
		}));

		return (
			<OptionPickerView
				ref={ref}
				// Controlled Props

				// disableOpenOnInput={disableOpenOnInput}
				disabled={disabledByParent || disabled}


				{...optionsProps}
				// 將以下 props 整合到 optionsProps
				// multiple={multiple}
				// name={name}
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
				{...infiniteProps}
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
	infinite: PropTypes.bool
};

export default WebApiOptionPicker;

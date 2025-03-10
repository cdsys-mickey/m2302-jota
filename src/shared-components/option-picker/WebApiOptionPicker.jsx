import PropTypes from "prop-types";

import { useWebApiOptions } from "@/shared-hooks/useWebApiOptions";
import { forwardRef, memo } from "react";
import OptionPicker from "./OptionPicker";

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
			getData,
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
			...rest
		} = props;

		// console.log("rendering WebApiOptionPicker");

		const {
			open: _open,
			onOpen: _onOpen,
			onClose: _onClose,
			onChange: _onChange,
			loading,
			options: _options,
			noOptionsText: _noOptionsText,
			onInputChange,
			disabled,
			findByInput: _findByInput,
			// pressToFind: _pressToFind,
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
			getData,
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
			mockDelay
		});

		return (
			<OptionPicker
				multiple={multiple}
				ref={ref}
				name={name}
				loading={loading}
				options={_options}
				noOptionsText={_noOptionsText}
				disabled={disabledByParent || disabled}
				// Controlled Props
				onInputChange={onInputChange}
				open={_open}
				onOpen={_onOpen}
				onClose={_onClose}
				onChange={_onChange}
				// pressToFind={_pressToFind}
				findByInput={_findByInput}
				disableOpenOnInput={disableOpenOnInput}
				// queryRequired={queryRequired}
				// filterByServer={filterByServer}
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
	getData: PropTypes.func,
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
	mockDelay: PropTypes.number
};

export default WebApiOptionPicker;

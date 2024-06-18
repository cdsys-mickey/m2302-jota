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
			disabled: disabledByParent = false,
			// for hook
			//http
			url,
			method = "get",
			disableLazy,
			queryParam = "q",
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
			disableOnSingleOption,
			autoSelectSingleOption,
			...rest
		} = props;

		// console.log("rendering WebApiOptionPicker");

		const {
			open,
			loading,
			options,
			noOptionsText,
			onInputChange,
			handleOpen,
			handleClose,
			disabled,
		} = useWebApiOptions({
			disableOnSingleOption,
			disableClose,
			multiple,
			url,
			method,
			bearer,
			disableLazy,
			queryParam,
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
			autoSelectSingleOption,
		});

		return (
			<OptionPicker
				multiple={multiple}
				ref={ref}
				name={name}
				loading={loading}
				options={options}
				noOptionsText={noOptionsText}
				disabled={disabledByParent || disabled}
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
	disableLazy: PropTypes.bool,
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
	disableOnSingleOption: PropTypes.bool,
	autoSelectSingleOption: PropTypes.bool,
};

export default WebApiOptionPicker;

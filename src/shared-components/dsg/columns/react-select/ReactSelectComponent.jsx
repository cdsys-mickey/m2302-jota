import { useLayoutEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import { useCallback } from "react";

const ReactSelectComponent = memo((props) => {
	const { active, rowData, setRowData, focus, stopEditing, columnData } =
		props;
	const { disabled, options, ...rest } = columnData;
	const ref = useRef();

	const handleChange = useCallback(
		(choice) => {
			if (choice === null) return;

			setRowData(choice.value);
			setTimeout(() => {
				stopEditing({ nextRow: false });
			}, 100);
		},
		[setRowData, stopEditing]
	);

	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	return (
		<ReactSelect
			ref={ref}
			styles={{
				container: (provided) => ({
					...provided,
					flex: 1,
					alignSelf: "stretch",
					pointerEvents: focus ? undefined : "none",
				}),
				control: (provided) => ({
					...provided,
					height: "100%",
					border: "none",
					boxShadow: "none",
					background: "none",
				}),
				indicatorSeparator: (provided) => ({
					...provided,
					opacity: 0,
				}),
				indicatorsContainer: (provided) => ({
					...provided,
					opacity: active ? 1 : 0,
				}),
				placeholder: (provided) => ({
					...provided,
					opacity: active ? 1 : 0,
				}),
			}}
			isDisabled={disabled}
			value={options.find(({ value }) => value === rowData) ?? null}
			menuPortalTarget={document.body}
			menuIsOpen={focus}
			onMenuClose={() => stopEditing({ nextRow: false })}
			options={options}
			onChange={handleChange}
			{...rest}
		/>
	);
});

ReactSelectComponent.propTypes = {
	columnData: PropTypes.object,
	setRowData: PropTypes.func,
	focus: PropTypes.bool,
	active: PropTypes.bool,
	stopEditing: PropTypes.func,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
};

ReactSelectComponent.displayName = "ReactSelectComponent";
export default ReactSelectComponent;

import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import FormFieldLabel from "../../../../shared-components/form/FormFieldLabel";
import { useMemo } from "react";

export const C03DialogRstLabel = (props) => {
	const { name, label = "進貨單", ...rest } = props;
	const value = useWatch({
		name,
	});

	const OrdIds = useMemo(() => {
		console.log("value", value);
		const result = value ? value?.split("，") : [];
		console.log("result", result);
		console.log("result.length", result.length);
		return result;
	}, [value]);

	const memosiedTitle = useMemo(() => {
		return OrdIds.join("、");
	}, [OrdIds]);

	return (
		<FormFieldLabel label={label} title={memosiedTitle} arrow {...rest}>
			{/* {OrdIds.length} 筆 */}
			{OrdIds.length > 0 ? `${OrdIds.length} 筆` : ""}
		</FormFieldLabel>
	);
};

C03DialogRstLabel.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
};

C03DialogRstLabel.displayName = "C03DialogRstLabel";

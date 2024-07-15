import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import FormFieldLabel from "../../../../shared-components/form/FormFieldLabel";

export const C03DialogCheckerLabel = (props) => {
	const { name, label = "覆核", ...rest } = props;
	const value = useWatch({
		name,
	});

	return (
		<FormFieldLabel label={label} {...rest}>
			{value}
		</FormFieldLabel>
	);
};

C03DialogCheckerLabel.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
};

C03DialogCheckerLabel.displayName = "C03DialogCheckerLabel";

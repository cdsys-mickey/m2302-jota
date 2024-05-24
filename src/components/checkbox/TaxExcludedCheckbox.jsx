import PropTypes from "prop-types";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import YesEmpty from "@/modules/md-yes-empty";

const TaxTypeCheckbox = (props) => {
	const { label = "稅外加", ...rest } = props;

	return (
		<CheckboxExWrapper
			label={label}
			defaultValue=""
			valueToChecked={YesEmpty.valueToChecked}
			checkedToValue={YesEmpty.checkedToValue}
			getLabel={YesEmpty.getOptionLabel}
			{...rest}
		/>
	);
};

TaxTypeCheckbox.propTypes = {
	label: PropTypes.string,
};

TaxTypeCheckbox.displayName = "TaxTypeCheckbox";
export default TaxTypeCheckbox;

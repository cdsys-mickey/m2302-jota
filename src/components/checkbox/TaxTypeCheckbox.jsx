import PropTypes from "prop-types";
import YesNo from "../../modules/md-yes-no";
import CheckboxExWrapper from "../../shared-components/checkbox/CheckboxExWrapper";

const TaxTypeCheckbox = (props) => {
	const { label = "稅外加", ...rest } = props;

	return (
		<CheckboxExWrapper
			label={label}
			defaultValue="N"
			name="TaxType"
			valueToChecked={YesNo.valueToChecked}
			checkedToValue={YesNo.checkedToValue}
			getLabel={YesNo.getOptionLabel}
			{...rest}
		/>
	);
};

TaxTypeCheckbox.propTypes = {
	label: PropTypes.string,
};

TaxTypeCheckbox.displayName = "TaxTypeCheckbox";
export default TaxTypeCheckbox;

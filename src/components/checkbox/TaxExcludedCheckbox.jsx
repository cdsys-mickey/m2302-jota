import YesEmpty from "@/modules/md-yes-empty";
import { CheckboxExField } from "@/shared-components";
import PropTypes from "prop-types";

const TaxTypeCheckbox = (props) => {
	const { label = "稅外加", ...rest } = props;

	return (
		<CheckboxExField
			label={label}
			defaultValue=""
			valueToChecked={YesEmpty.valueToChecked}
			checkedToValue={YesEmpty.checkedToValue}
			getLabel={YesEmpty.getOptionLabel}
			variant="outlined"
			size="small"
			fullWidth
			{...rest}
		/>
	);
};

TaxTypeCheckbox.propTypes = {
	label: PropTypes.string,
};

TaxTypeCheckbox.displayName = "TaxTypeCheckbox";
export default TaxTypeCheckbox;

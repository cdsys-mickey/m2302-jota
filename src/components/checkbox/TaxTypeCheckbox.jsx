import YesNo from "../../modules/md-yes-no";
import { TypoCheckboxExContainer } from "../../shared-components/checkbox/TypoCheckboxExContainer";
import PropTypes from "prop-types";

const TaxTypeCheckbox = (props) => {
	const { typo, label = "稅外加", ...rest } = props;

	if (!typo) {
		return (
			<CheckboxExContainer
				label="稅外加"
				defaultValue="N"
				name="TaxType"
				valueToChecked={YesNo.valueToChecked}
				checkedToValue={YesNo.checkedToValue}>
				{YesNo.getOptionLabel(data?.TaxType)}
			</CheckboxExContainer>
		);
	}

	return (
		<CheckboxWrapper
			label="稅外加"
			defaultValue="N"
			name="TaxType"
			valueToChecked={YesNo.valueToChecked}
			checkedToValue={YesNo.checkedToValue}>
			{YesNo.getOptionLabel(data?.TaxType)}
		</CheckboxWrapper>
	);
};

TaxTypeCheckbox.propTypes = {
	label: PropTypes.string,
};

TaxTypeCheckbox.displayName = "TaxTypeCheckbox";
export default TaxTypeCheckbox;

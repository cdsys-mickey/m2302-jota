import { MockProdClassLg } from "@/mocks/mock-prod-class-lg";
import { OptionPickerContainer } from "@/shared-components/picker/OptionPickerContainer";
import { FilterMode } from "@/shared-modules/option-pickers";

const CompGroupPickerEx = (props) => {
	const {
		label = "大分類",
		placeholder = "請輸入名稱來篩選",
		autoHighlight = true,
		...rest
	} = props;

	return (
		<OptionPickerContainer
			label={label}
			placeholder={placeholder}
			autoHighlight={autoHighlight}
			lazy
			data={MockProdClassLg}
			{...rest}
		/>
	);
};

export default CompGroupPickerEx;

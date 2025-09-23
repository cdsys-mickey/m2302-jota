import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { LastFieldBehavior } from "../../../shared-components/form-meta/LastFieldBehavior";

export const useInputTest = () => {
	const formMeta = useFormMeta(
		`
		prodPicker,
		prodPicker2,
		picker1,
		picker3,
		check1,
		text1,
		date1,
		datepicker1,
		text2,
		`,
		{
			lastField: LastFieldBehavior.PROMPT,
		}
	);

	return {
		formMeta,
	};
};

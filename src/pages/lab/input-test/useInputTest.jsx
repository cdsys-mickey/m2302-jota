import { useFormManager } from "@/shared-contexts/form-manager/useFormManager";

export const useInputTest = () => {
	const formManager = useFormManager(
		`
		picker2,
		picker1,
		picker3,
		text1,
		text2
		`
	);

	return {
		formManager,
	};
};

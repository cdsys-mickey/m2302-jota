import { useFormManager } from "@/shared-contexts/form-manager/useFormManager";

export const useRHFTabTest = () => {
	const formManager = useFormManager(
		`
		text1,
		text2,
		text3,
		text4
		`
	);

	return {
		formManager,
		// text3Disabled,
	};
};

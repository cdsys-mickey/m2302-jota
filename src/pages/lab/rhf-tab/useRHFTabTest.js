import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";

export const useRHFTabTest = () => {
	const formMeta = useFormMeta(
		`
		text1,
		text2,
		text3,
		text4
		`
	);

	return {
		formMeta,
		// text3Disabled,
	};
};

import { useToggle } from "@/shared-hooks/useToggle";

export const useA03 = () => {
	const [readOnly, toggleReadOnly] = useToggle(true);
	return {
		readOnly,
		toggleReadOnly,
	};
};

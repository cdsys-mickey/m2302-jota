import { useToggle } from "@/shared-hooks/useToggle";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useAppModule } from "./useAppModule";

export const useA03 = () => {
	const [readOnly, toggleReadOnly] = useToggle(true);
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A03",
	});
	return {
		...appModule,
		readOnly,
		toggleReadOnly,
	};
};

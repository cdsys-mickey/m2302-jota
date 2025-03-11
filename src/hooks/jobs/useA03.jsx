import { useToggle } from "@/shared-hooks/useToggle";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useState } from "react";
import { useCallback } from "react";

export const useA03 = () => {
	const [readOnly, toggleReadOnly] = useToggle(true);
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A03",
	});
	const [state, setState] = useState({
		lgId: null,
		mgId: null,
		smId: null,
	});

	const setLgId = useCallback((lgId) => {
		setState((prev) => ({
			...prev,
			lgId,
			mgId: null,
			smId: null,
		}));
	}, []);

	const setMdId = useCallback((mdId) => {
		setState((prev) => ({
			...prev,
			mdId,
			smId: null,
		}));
	}, []);

	const setSmId = useCallback((smId) => {
		setState((prev) => ({
			...prev,
			smId,
		}));
	}, []);

	return {
		...appModule,
		readOnly,
		toggleReadOnly,
		...state,
		setLgId,
		setMdId,
		setSmId,
	};
};

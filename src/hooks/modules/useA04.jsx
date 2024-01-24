import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useContext } from "react";
import { useAppModule } from "./useAppModule";
import CrudContext from "../../contexts/crud/CrudContext";

export const useA04 = ({ token }) => {
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A04",
	});
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A04",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/counters",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
		...crud,
		...appModule,
	};
};

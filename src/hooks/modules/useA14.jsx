import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import { useCallback } from "react";

export const useA14 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A14",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/scraps",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

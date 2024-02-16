import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA13 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A13",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/prod/pdlines",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

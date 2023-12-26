import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA11 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A11",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/banks",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

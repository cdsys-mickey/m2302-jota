import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA15 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A15",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/ou/employees",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

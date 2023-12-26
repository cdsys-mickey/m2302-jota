import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA10 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A10",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/customer/areas",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA08 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A08",
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

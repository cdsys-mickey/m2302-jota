import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA09 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A09",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/customer/channels",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

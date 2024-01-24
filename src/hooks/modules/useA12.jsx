import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA12 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A12",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/sale/customer/payments",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

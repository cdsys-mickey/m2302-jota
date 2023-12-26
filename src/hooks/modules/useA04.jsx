import { useInit } from "@/shared-hooks/useInit";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA04 = ({ token }) => {
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
	};
};

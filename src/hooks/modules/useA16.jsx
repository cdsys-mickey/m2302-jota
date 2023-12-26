import { useInit } from "@/shared-hooks/useInit";
import { useCallback } from "react";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";
import QueryString from "query-string";

export const useA16 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A16",
		keyColumn: "DeptID",
		otherColumns: "GroupKey,DeptName,AbbrName",
		baseUri: "v1/depts",
		displayName: "門市代碼",
		queryString: QueryString.stringify({
			sd: 1,
		}),
	});

	const handleCreateRow = useCallback(
		() => ({
			Using_N: "1",
		}),
		[]
	);

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
		handleCreateRow,
	};
};

import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDSG } from "../../shared-hooks/useDSG";
import { useWebApiDSG } from "../../shared-hooks/useWebApiDSG";

export const useA13 = ({ token }) => {
	const dsgEditor = useWebApiDSG({
		token,
		gridId: "A13",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
		baseUri: "v1/pdlines",
	});

	useInit(() => {
		dsgEditor.load();
	}, []);

	return {
		...dsgEditor,
	};
};

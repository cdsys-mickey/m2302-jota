import { useContext } from "react";
import Copyright from "./Copyright";
import { AppContext } from "@/contexts/app/AppContext";
import { useInit } from "@/shared-hooks/useInit";
import { useCallback } from "react";
import { toastEx } from "@/helpers/toastEx";

export const CopyrightContainer = (props) => {
	const { ...rest } = props;
	const { version, apiVersion, loadAppInfo, loading } = useContext(AppContext);

	const handleCopyVersion = useCallback(async () => {
		await navigator.clipboard.writeText(version);
		toastEx.info("版號已複製到剪貼簿")
	}, [version]);

	useInit(() => {
		loadAppInfo();
	}, []);

	return <Copyright loading={loading} version={version} apiVersion={apiVersion} handleCopyVersion={handleCopyVersion} {...rest} />;
};

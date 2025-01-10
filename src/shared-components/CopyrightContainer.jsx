import { useContext } from "react";
import Copyright from "./Copyright";
import { AppContext } from "@/contexts/app/AppContext";
import { useInit } from "@/shared-hooks/useInit";

export const CopyrightContainer = (props) => {
	const { ...rest } = props;
	const { version, apiVersion, loadAppInfo, loading } = useContext(AppContext);

	useInit(() => {
		loadAppInfo();
	}, []);

	return <Copyright loading={loading} version={version} apiVersion={apiVersion} {...rest} />;
};

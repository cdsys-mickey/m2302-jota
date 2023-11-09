import { useContext } from "react";
import Copyright from "./Copyright";
import { AppContext } from "@/contexts/app/AppContext";

export const CopyrightContainer = (props) => {
	const { ...rest } = props;
	const { version, apiVersion } = useContext(AppContext);

	return <Copyright version={version} apiVersion={apiVersion} {...rest} />;
};

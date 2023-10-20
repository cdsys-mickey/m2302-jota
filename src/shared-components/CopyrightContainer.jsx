import React from "react";
import Copyright from "./Copyright";
import { useApp } from "@/contexts/useApp";

export const CopyrightContainerStub = (props, ref) => {
	const { ...rest } = props;
	const app = useApp();

	return <Copyright ref={ref} version={app.version} {...rest} />;
};

export const CopyrightContainer = React.forwardRef(CopyrightContainerStub);

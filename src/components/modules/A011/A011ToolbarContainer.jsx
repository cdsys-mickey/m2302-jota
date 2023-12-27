import { useContext } from "react";
import A011Toolbar from "./A011Toolbar";
import { A011Context } from "../../../contexts/A011/A011Context";

export const A011ToolbarContainer = () => {
	const a011 = useContext(A011Context);

	return <A011Toolbar />;
};

A011ToolbarContainer.displayName = "A011ToolbarContainer";

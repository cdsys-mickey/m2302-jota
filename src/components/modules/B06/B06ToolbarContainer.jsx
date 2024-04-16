import { useContext } from "react";
import B06Toolbar from "./B06Toolbar";
import { B06Context } from "../../../contexts/B06/B06Context";

export const B06ToolbarContainer = (props) => {
	const { ...rest } = props;
	const b06 = useContext(B06Context);

	return <B06Toolbar loading={b06.listLoading} {...rest} />;
};

B06ToolbarContainer.displayName = "B06ToolbarContainer";

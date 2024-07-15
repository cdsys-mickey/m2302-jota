import { useContext } from "react";
import D01ListHeader from "./D01ListHeader";
import { D01Context } from "@/contexts/D01/D01Context";

export const D01ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(D01Context);

	return <D01ListHeader expChecking={c04.expChecking} {...rest} />;
};

D01ListHeaderContainer.displayName = "D01ListHeaderContainer";


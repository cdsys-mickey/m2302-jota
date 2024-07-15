import { useContext } from "react";
import D06ListHeader from "./D06ListHeader";
import { D06Context } from "@/contexts/D06/D06Context";

export const D06ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(D06Context);

	return <D06ListHeader expChecking={c04.expChecking} {...rest} />;
};

D06ListHeaderContainer.displayName = "D06ListHeaderContainer";




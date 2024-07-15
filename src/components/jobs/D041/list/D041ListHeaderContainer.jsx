import { useContext } from "react";
import D041ListHeader from "./D041ListHeader";
import { D041Context } from "@/contexts/D041/D041Context";

export const D041ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(D041Context);

	return <D041ListHeader expChecking={c04.expChecking} {...rest} />;
};

D041ListHeaderContainer.displayName = "D041ListHeaderContainer";




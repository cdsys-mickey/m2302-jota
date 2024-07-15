import { useContext } from "react";
import D02ListHeader from "./D02ListHeader";
import { D02Context } from "@/contexts/D02/D02Context";

export const D02ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(D02Context);

	return <D02ListHeader expChecking={c04.expChecking} {...rest} />;
};

D02ListHeaderContainer.displayName = "D02ListHeaderContainer";



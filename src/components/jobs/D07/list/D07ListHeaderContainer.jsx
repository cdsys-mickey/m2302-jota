import { useContext } from "react";
import D07ListHeader from "./D07ListHeader";
import { D07Context } from "@/contexts/D07/D07Context";

export const D07ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(D07Context);

	return <D07ListHeader expChecking={c04.expChecking} {...rest} />;
};

D07ListHeaderContainer.displayName = "D07ListHeaderContainer";





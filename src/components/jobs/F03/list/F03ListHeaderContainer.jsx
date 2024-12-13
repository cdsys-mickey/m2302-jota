import { useContext } from "react";
import F03ListHeader from "./F03ListHeader";
import { F03Context } from "@/contexts/F03/F03Context";

export const F03ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(F03Context);

	return <F03ListHeader expChecking={c04.expChecking} {...rest} />;
};

F03ListHeaderContainer.displayName = "F03ListHeaderContainer";






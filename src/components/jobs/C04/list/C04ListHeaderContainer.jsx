import { useContext } from "react";
import C04ListHeader from "./C04ListHeader";
import { C04Context } from "@/contexts/C04/C04Context";

export const C04ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);

	return <C04ListHeader expChecking={c04.expChecking} {...rest} />;
};

C04ListHeaderContainer.displayName = "C04ListHeaderContainer";

import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
import A011Form2 from "./A011Form2";

export const A011Form2Container = (props) => {
	const { ...rest } = props;
	const a011 = useContext(A011Context);
	const { expanded } = a011;
	return <A011Form2 expanded={expanded} {...rest} />;
};

A011Form2Container.displayName = "A011Form2Container";

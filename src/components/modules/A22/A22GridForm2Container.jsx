import { useContext } from "react";
import A22GridForm2 from "./A22GridForm2";
import { A22Context } from "@/contexts/A22/A22Context";

export const A22GridForm2Container = (props) => {
	const { ...rest } = props;
	const a22 = useContext(A22Context);
	const { expanded } = a22;
	return <A22GridForm2 expanded={expanded} {...rest} />;
};

A22GridForm2Container.displayName = "A22GridForm2Container";

import { useContext } from "react";
import ProdGridForm2 from "./ProdGridForm2";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridForm2Container = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);
	const { expanded } = prodGrid;
	return <ProdGridForm2 expanded={expanded} {...rest} />;
};

ProdGridForm2Container.displayName = "ProdGridForm2Container";

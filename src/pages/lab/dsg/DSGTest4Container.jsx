import { useRef } from "react";
import DSGTest4 from "./DSGTest4";

export const DSGTest4Container = () => {
	const gridRef = useRef();
	return <DSGTest4 gridRef={gridRef} />;
};

DSGTest4Container.displayName = "DSGTest4Container";

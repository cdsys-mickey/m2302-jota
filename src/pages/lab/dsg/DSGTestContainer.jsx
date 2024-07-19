import { useContext } from "react";
import DSGTest from "./DSGTest";
import { DSGTestContext } from "./DSGTestContext";
import { useRef } from "react";

export const DSGTestContainer = () => {
	const gridRef = useRef();
	return <DSGTest gridRef={gridRef} />;
};

DSGTestContainer.displayName = "DSGTestContainer";

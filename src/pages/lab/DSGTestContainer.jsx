import { useContext } from "react";
import DSGTest from "./DSGTest";
import { DSGTestContext } from "./DSGTestContext";

export const DSGTestContainer = () => {
	const dsg = useContext(DSGTestContext);
	return <DSGTest gridRef={dsg.gridRef} />;
};

DSGTestContainer.displayName = "DSGTestContainer";

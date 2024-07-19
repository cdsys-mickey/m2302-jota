import { useRef } from "react";
import DSGTest2 from "./DSGTest2";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const DSGTest2Container = () => {
	const gridRef = useRef();
	const auth = useContext(AuthContext);
	return <DSGTest2 gridRef={gridRef} bearer={auth.token} />;
};

DSGTest2Container.displayName = "DSGTest2Container";

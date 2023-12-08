import { useContext } from "react";
import ProdTransGrid from "./ProdTransGrid";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const ProdTransGridContainer = () => {
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	return (
		<ProdTransGrid
			gridRef={a01.setTransGridRef}
			lockRows={!a01.editing}
			data={a01.transGridData}
			handleGridChange={a01.handleTransGridChange}
			bearer={auth.token}
		/>
	);
};

ProdTransGridContainer.displayName = "ProdTransGridContainer";

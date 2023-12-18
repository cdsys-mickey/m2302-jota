import { useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdComboGrid from "./ProdComboGrid";

export const ProdComboGridContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);

	return (
		<ProdComboGrid
			gridRef={a01.setComboGridRef}
			lockRows={!a01.editing}
			data={a01.comboGridData}
			handleGridChange={a01.handleComboGridChange}
			bearer={auth.token}
			{...rest}
		/>
	);
};

ProdComboGridContainer.displayName = "ProdComboGridContainer";

import { useContext } from "react";
import C04ProdGrid from "./C04ProdGrid";
import { C04Context } from "@/contexts/C04/C04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext } from "react-hook-form";

export const C04ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	return (
		<C04ProdGrid
			gridRef={c04.setGridRef}
			readOnly={!c04.editing}
			data={c04.gridData}
			// handleGridChange={c04.handleGridChange({
			// 	getValues: form.getValues,
			// 	setValue: form.setValue,
			// })}
			bearer={auth.token}
			height={height - 390}
			getRowKey={c04.getRowKey}
			prodDisabled={c04.prodDisabled}
			{...rest}
		/>
	);
};

C04ProdGridContainer.displayName = "C04ProdGridContainer";

import { useContext } from "react";
import C03ProdGrid from "./C03ProdGrid";
import { C03Context } from "@/contexts/C03/C03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext } from "react-hook-form";

export const C03ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c03 = useContext(C03Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	return (
		<C03ProdGrid
			gridRef={c03.setGridRef}
			readOnly={!c03.editing}
			data={c03.gridData}
			handleGridChange={c03.handleGridChange({
				getValues: form.getValues,
			})}
			bearer={auth.token}
			height={height - 390}
			getRowKey={c03.getRowKey}
			spriceDisabled={c03.spriceDisabled}
			{...rest}
		/>
	);
};

C03ProdGridContainer.displayName = "C03ProdGridContainer";

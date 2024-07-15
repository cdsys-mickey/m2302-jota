import { useContext } from "react";
import C03ProdGrid from "./C03ProdGrid";
import { C03Context } from "@/contexts/C03/C03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";

export const C03ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c03 = useContext(C03Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const handleGridChange = useMemo(() => {
		return c03.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c03, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<C03ProdGrid
				gridRef={c03.setGridRef}
				readOnly={!c03.editing}
				data={c03.gridData || []}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 408}
				getRowKey={c03.getRowKey}
				spriceDisabled={c03.spriceDisabled}
				sqtyDisabled={c03.sqtyDisabled}
				prodDisabled={c03.prodDisabled}
				createRow={c03.createRow}
				{...rest}
			/>
		</DSGBox>
	);
};

C03ProdGridContainer.displayName = "C03ProdGridContainer";

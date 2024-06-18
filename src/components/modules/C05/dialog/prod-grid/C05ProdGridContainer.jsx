import { useContext } from "react";
import C05ProdGrid from "./C05ProdGrid";
import { C05Context } from "@/contexts/C05/C05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";

export const C05ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c05 = useContext(C05Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const supplier = useWatch({
		name: "supplier",
		conrtol: form.control,
	});

	const rtnDate = useWatch({
		name: "GrtDate",
		control: form.control,
	});

	const handleGridChange = useMemo(() => {
		return c05.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
		});
	}, [c05, form.getValues, form.setValue]);

	return (
		<DSGBox>
			<C05ProdGrid
				gridRef={c05.setGridRef}
				readOnly={!c05.editing || !supplier || !rtnDate}
				data={c05.gridData}
				handleGridChange={handleGridChange}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c05.getRowKey}
				{...rest}
			/>
		</DSGBox>
	);
};

C05ProdGridContainer.displayName = "C05ProdGridContainer";

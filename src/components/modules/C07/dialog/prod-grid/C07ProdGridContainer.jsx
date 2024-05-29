import { useContext } from "react";
import C07ProdGrid from "./C07ProdGrid";
import { C07Context } from "@/contexts/C07/C07Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";

export const C07ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);
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

	return (
		<DSGBox>
			<C07ProdGrid
				gridRef={c07.setGridRef}
				readOnly={!c07.editing || !supplier || !rtnDate}
				data={c07.gridData}
				handleGridChange={c07.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c07.getRowKey}
				{...rest}
			/>
		</DSGBox>
	);
};

C07ProdGridContainer.displayName = "C07ProdGridContainer";

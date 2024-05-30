import { useContext } from "react";
import C08ProdGrid from "./C08ProdGrid";
import { C08Context } from "@/contexts/C08/C08Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";

export const C08ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c08 = useContext(C08Context);
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
			<C08ProdGrid
				gridRef={c08.setGridRef}
				readOnly={!c08.editing || !supplier || !rtnDate}
				data={c08.gridData}
				handleGridChange={c08.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c08.getRowKey}
				{...rest}
			/>
		</DSGBox>
	);
};

C08ProdGridContainer.displayName = "C08ProdGridContainer";

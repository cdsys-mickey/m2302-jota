import { useContext } from "react";
import C09ProdGrid from "./C09ProdGrid";
import { C09Context } from "@/contexts/C09/C09Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";

export const C09ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);
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
			<C09ProdGrid
				gridRef={c09.setGridRef}
				readOnly={!c09.editing || !supplier || !rtnDate}
				data={c09.gridData}
				handleGridChange={c09.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c09.getRowKey}
				{...rest}
			/>
		</DSGBox>
	);
};

C09ProdGridContainer.displayName = "C09ProdGridContainer";

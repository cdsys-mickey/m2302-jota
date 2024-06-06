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

	const txiDept = useWatch({
		name: "txiDept",
		conrtol: form.control,
	});

	return (
		<DSGBox>
			<C08ProdGrid
				gridRef={c08.setGridRef}
				readOnly={!c08.editing || !txiDept}
				data={c08.gridData}
				handleGridChange={c08.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
				})}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c08.getRowKey}
				stypeDisabled={c08.stypeDisabled}
				getSPriceClassName={c08.getSPriceClassName}
				sprodDisabled={c08.sprodDisabled}
				sqtyDisabled={c08.sqtyDisabled}
				dtypeDisabled={c08.dtypeDisabled}
				handleGridSelectionChange={c08.handleGridSelectionChange}
				{...rest}
			/>
		</DSGBox>
	);
};

C08ProdGridContainer.displayName = "C08ProdGridContainer";

import { useContext } from "react";
import C04ProdGrid from "./C04ProdGrid";
import { C04Context } from "@/contexts/C04/C04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";

export const C04ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	const supplier = useWatch({
		name: "supplier",
		conrtol: form.control,
	});

	const rstDate = useWatch({
		name: "GinDate",
		control: form.control,
	});

	return (
		<DSGBox>
			<C04ProdGrid
				gridRef={c04.setGridRef}
				readOnly={!c04.editing || !supplier || !rstDate}
				data={c04.gridData}
				handleGridChange={c04.handleGridChange({
					getValues: form.getValues,
					setValue: form.setValue,
					// handleRefreshAmt: c04.handleRefreshAmt,
				})}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c04.getRowKey}
				prodDisabled={c04.prodDisabled}
				spriceDisabled={c04.spriceDisabled}
				getSPriceClassName={c04.getSPriceClassName}
				{...rest}
			/>
		</DSGBox>
	);
};

C04ProdGridContainer.displayName = "C04ProdGridContainer";

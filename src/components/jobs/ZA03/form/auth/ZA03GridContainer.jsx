import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import ZA03Grid from "./ZA03Grid";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

const ZA03GridContainer = () => {
	const { height } = useWindowSize();
	const za03 = useContext(ZA03Context);
	const { token } = useContext(AuthContext);
	const formMeta = useContext(FormMetaContext);

	return (
		<DSGContext.Provider value={{
			...za03.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<ZA03Grid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				// rowKey={za03.getRowKey}
				rowKey="JobID"
				// readOnly={za03.readOnly}
				data={za03.gridData}
				uid={za03.itemData?.UID}
				bearer={token}
				loading={za03.authGridLoading}
				onChange={za03.handleGridChange}
				onSelectionChange={formMeta.gridMeta.handleSelectionChange}

				funcDisabled={za03.funcDisabled}
				height={height - 250}
				isPersisted={za03.isPersisted}
				handleCreateRow={za03.handleCreateRow}
				isKeyDisabled={za03.isKeyDisabled}
				getOptionLabel={za03.getOptionLabel}
				isOptionEqualToValue={za03.isOptionEqualToValue}
				getData={za03.getData}

				getRowClassName={za03.getRowClassName}


			/>
		</DSGContext.Provider>
	);
};

ZA03GridContainer.displayName = "ZA03GridContainer";

export default ZA03GridContainer;

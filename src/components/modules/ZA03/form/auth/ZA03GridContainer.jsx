import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import ZA03Grid from "./ZA03Grid";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Users from "../../../../../modules/md-users";

const ZA03GridContainer = () => {
	const { height } = useWindowSize();
	const za03 = useContext(ZA03Context);
	const { token } = useContext(AuthContext);

	return (
		<ZA03Grid
			// rowKey={za03.getRowKey}
			rowKey="JobID"
			// readOnly={za03.readOnly}
			readOnly={!za03.authEditing}
			gridRef={za03.setGridRef}
			data={za03.gridData}
			uid={za03.itemData?.UID}
			bearer={token}
			loading={za03.authGridLoading}
			// handleChange={za03.handleAuthGridChange}
			onChange={za03.handleGridChange({
				onPatch:
					za03.authEditingMode === Users.AUTH_EDITING_MODE.CLICK
						? za03.handlePatch
						: null,
				onDelete: za03.handleConfirmDelete,
			})}
			height={height - 230}
			isPersisted={za03.isPersisted}
			handleCreateRow={za03.handleCreateRow}
			isKeyDisabled={za03.isKeyDisabled}
			getOptionLabel={za03.getOptionLabel}
			isOptionEqualToValue={za03.isOptionEqualToValue}
			getData={za03.getData}
			onSelectionChange={za03.handleSelectionChange({
				onRowSelectionChange: za03.onRowSelectionChange,
			})}
			getRowClassName={za03.getRowClassName}
		/>
	);
};

ZA03GridContainer.displayName = "ZA03GridContainer";

export default ZA03GridContainer;

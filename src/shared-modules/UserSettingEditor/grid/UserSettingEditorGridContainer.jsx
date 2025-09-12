import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import { DSGGrid } from "@/shared-components";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import DSGMetaContext from "@/shared-contexts/datasheet-grid/DSGMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import UserSettingEditorContext from "../context/UserSettingEditorContext";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const UserSettingEditorGridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const userSettingEditor = useContext(UserSettingEditorContext);
	// const grid = useContext(DSGContext);
	const gridMeta = useContext(DSGMetaContext);

	const _height = useMemo(() => {
		// return height - 494 + (userSettingEditor.gridDisabled ? 48 : 0)
		return height - 494
	}, [height])

	const onChange = useMemo(() => {
		return userSettingEditor.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: gridMeta,
			onUpdateRow: userSettingEditor.onUpdateRow,
			onGridChanged: userSettingEditor.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, gridMeta, userSettingEditor.grid, userSettingEditor.onGridChanged, userSettingEditor.onUpdateRow]);

	if (!userSettingEditor.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (userSettingEditor.grid.gridData?.length === 0 && userSettingEditor.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	if (userSettingEditor.loadWorking) {
		return (
			<DSGLoading height={_height} />
		);
	}

	if (userSettingEditor.loadError) {
		return <FormErrorBox error={userSettingEditor.loadError} />
	}

	return (

		<DSGGrid
			ref={gridMeta.setGridRef}
			// lockRows={userSettingEditor.grid.readOnly}
			lockRows={true}
			columns={gridMeta.columns}
			value={userSettingEditor.grid.gridData}
			onChange={onChange}
			onActiveCellChange={gridMeta.handleActiveCellChange}
			addRowsComponent={DSGAddRowsToolbarEx}
			height={_height}
			createRow={userSettingEditor.createRow}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			slotProps={{
				box: {
					// mt: 0.5
				}
			}}
			{...rest}
		/>
	);
};

UserSettingEditorGridContainer.propTypes = {
	store: PropTypes.bool,
};
UserSettingEditorGridContainer.displayName = "UserSettingEditorGridContainer";
export default UserSettingEditorGridContainer;

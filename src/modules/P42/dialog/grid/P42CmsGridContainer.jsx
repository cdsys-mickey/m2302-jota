import { P42Context } from "@/modules/P42/P42Context";
import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import P42CmsRow1Container from "./P42CmsRow1/P42CmsRow1Container";
import P42CmsRow2Container from "./P42CmsRow2/P42CmsRow2Container";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P42CmsGridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const theme = useTheme();
	const lgOrUp = useMediaQuery(theme.breakpoints.up('lg'));

	const form = useFormContext();
	const p42 = useContext(P42Context);
	const formMeta = useContext(FormMetaContext);
	const _addRowsComponent = useMemo(() => {
		return createAddRowsComponentEx({
			hideButton: true,
			hideNumberField: true,
			RightComponent: P42CmsRow1Container
		})
	}, [])

	const _height = useMemo(() => {
		return lgOrUp ? height - 510 : 200;
	}, [height, lgOrUp])

	const _loadingHeight = useMemo(() => {
		return lgOrUp ? height - 482 : 200;
	}, [height, lgOrUp])

	const onChange = useMemo(() => {
		return p42.cmsGrid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: p42.onUpdateCmsRow,
			onGridChanged: p42.onCmsGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, formMeta.gridMeta, p42.cmsGrid, p42.onCmsGridChanged, p42.onUpdateCmsRow]);

	if (!p42.cmsGrid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p42.cmsGrid.gridData?.length === 0 && p42.gridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGContext.Provider
			value={{
				...p42.cmdGrid,
				...formMeta.cmsGridMeta,
				readOnly: !p42.editing
			}}>
			<DSGGrid
				ref={formMeta.cmsGridMeta.setGridRef}
				lockRows={p42.gridDisabled}
				columns={formMeta.cmsGridMeta.columns}
				value={p42.cmsGrid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.cmsGridMeta.handleActiveCellChange}
				addRowsComponent={_addRowsComponent}
				height={_height}
				loadingHeight={_loadingHeight}
				createRow={p42.createCmsRow}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				// slotProps={{
				// 	box: {
				// 		mt: -1.5
				// 	}
				// }}
				{...rest}
			>
				{!p42.editing && <P42CmsRow1Container />}
				<P42CmsRow2Container />
			</DSGGrid>
		</DSGContext.Provider>
	);
};

P42CmsGridContainer.propTypes = {
	store: PropTypes.bool,
};
P42CmsGridContainer.displayName = "P42CmsGridContainer";
export default P42CmsGridContainer;
import { InvTakingListingPickerComponentContainer } from "@/components/dsg/columns/inv-taking-listing-picker/InvTakingListingPickerComponentContainer";
import { F02Context } from "@/contexts/F02/F02Context";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm } from "react-hook-form";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import F02Grid from "./F02Grid";

const F02GridContainer = () => {
	const { height } = useWindowSize();
	const f02 = useContext(F02Context);
	const form = useForm();

	const columns = useMemo(
		() => [

			{
				...keyColumn(
					"listing",
					optionPickerColumn(InvTakingListingPickerComponentContainer, {
						name: "listing",
						disableOpenOnInput: true,
						// hideControlsOnActive: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						forId: true,
						slotProps: {
							paper: {
								sx: {
									width: 340,
								},
							},
						},
					})
				),
				title: "清單編號",
				minWidth: 160,
				maxWidth: 160,
				disabled: f02.grid.readOnly,
			},
			{
				...keyColumn(
					"PhyData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "清單名稱",
				disabled: true,
			},

		],
		[f02.grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: f02.grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});



	const onSelectionChange = useMemo(() => {
		return gridMeta.buildSelectionChangeHandler()
	}, [gridMeta]);

	const onChange = useMemo(() => {
		return f02.grid.buildGridChangeHandler({ gridMeta, onUpdateRow: f02.onUpdateRow })
	}, [f02.grid, f02.onUpdateRow, gridMeta])

	const _height = useMemo(() => {
		return height - 224
	}, [height]);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{
				...f02.grid,
				...gridMeta
			}}>
				<F02Grid
					columns={columns}
					lockRows={f02.grid.readOnly}
					gridRef={gridMeta.setGridRef}
					data={f02.grid.gridData}
					loading={f02.grid.gridLoading}
					height={_height}
					onChange={onChange}
					onActiveCellChange={gridMeta.handleActiveCellChange}
					onSelectionChange={onSelectionChange}
					// isPersisted={f02.isPersisted}
					canCreate={f02.canCreate}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

F02GridContainer.displayName = "F02GridContainer";

export default F02GridContainer;



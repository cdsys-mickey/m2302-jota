import CmsTypePickerCell from "@/components/CmsTypePicker/CmsTypePickerCell";
import Colors from "@/modules/Colors.mjs";
import { P35Context } from "@/modules/P35/P35Context";
import { DialogEx } from "@/shared-components";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useCallback, useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P35DialogForm from "../form/P35DialogForm";
import P35Drawer from "../P35Drawer";
import { P35DialogButtonsContainer } from "./buttons/P35DialogButtonsContainer";

export const P35DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const { reset } = form;
	const p35 = useContext(P35Context);

	const _height = useMemo(() => {
		return height - 110
	}, [height])

	const readOnly = useMemo(() => {
		return p35.gridDisabled;
	}, [p35.gridDisabled])

	const columns = useMemo(
		() => [
			{
				...keyColumn("cmsType",
					optionPickerColumn(CmsTypePickerCell, {
						name: "cmsType",
					})
				),
				title: "佣金類別",
				// minWidth: 130,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"STrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "旅行社佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"SCndCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "導遊佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: p35.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p35.grid
	});

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		guideAmt,
		guideAmtMultipliedByBus,
		driverAmt,
		driverAmtMultipliedByBus,
		TrvID,
		TrvData,
		AbbrID,
		city,
		area,
		Contact,
		Tel,
		Fax,
		Cel,
		Email,
		Postal,
		Addr,
		Uniform,
		InvTitle,
		bank,
		BankAcct,
		Remark,
		Assign,
		AsRemark,
		Bonus1,
		Bonus2,
		CmsDn,
		clearOnSite1,
		clearOnSite2,
		clearOnSite3,
		`, {
		lastField: handleLastField
	}
	);

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "area":
					return true;
				default:
					return false;
			}
		},
		[]
	);

	const title = useMemo(() => {
		if (p35.creating) {
			return "新增";
		} else if (p35.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p35.creating, p35.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(p35.onEditorSubmit, p35.onEditorSubmitError);
	}, [form, p35.onEditorSubmit, p35.onEditorSubmitError]);

	const handleCityChange = useCallback((newValue) => {
		form.setValue("area", newValue?.CtAreaID ? {
			CodeID: newValue.CtAreaID,
			CodeData: newValue.CtAreaData
		} : null)
	}, [form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (p35.itemDataReady) {
			console.log(`p35 form reset`, p35.itemData);
			reset(p35.itemData);
		}
	}, [p35.itemData, p35.itemDataReady]);

	return (
		<DialogEx
			title={title}
			ref={ref}
			// fullScreen
			responsive
			fullWidth
			maxWidth="lg"
			TitleButtonsComponent={P35DialogButtonsContainer}
			open={p35.itemViewOpen}
			onClose={
				p35.editing ? p35.confirmDialogClose : p35.cancelAction
			}
			// onReturn={p35.updating ? p35.confirmReturn : null}
			sx={{
				"& .MuiDialog-paper": {
					backgroundColor: Colors.DIALOG_BG,
				},
			}}
			contentSx={[
				// {
				// 	minHeight: "30em",
				// },
				scrollable.scroller,
			]}
			{...rest}>
			<FormMetaProvider {...formMeta} gridMeta={gridMeta} isFieldDisabled={isFieldDisabled}>
				<P35DialogForm
					ref={ref}
					onSubmit={handleSubmit}
					editing={p35.editing}
					updating={p35.updating}
					readWorking={p35.readWorking}
					readError={p35.readError}
					data={p35.itemData}
					itemDataReady={p35.itemDataReady}
					onCityChange={handleCityChange}
				/>
			</FormMetaProvider>
			<P35Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
		</DialogEx>
	);
});

P35DialogContainer.displayName = "P35DialogContainer";



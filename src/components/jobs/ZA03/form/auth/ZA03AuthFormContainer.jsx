import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { createCheckboxExColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxExColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import ZA03AuthForm from "./ZA03AuthForm";

const CHECK_WIDTH = 54;

export const ZA03AuthFormContainer = () => {
	// const form = useForm();
	const za03 = useContext(ZA03Context);

	const readOnly = useMemo(() => {
		return !za03.authGridEditing;
	}, [za03.authGridEditing])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"enabled",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"JobID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "代號",
				grow: 1,
				disabled: true,
				minWidth: 70,
				maxWidth: 70,
			},
			{
				...keyColumn(
					"JobName_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				grow: 1,
				disabled: true,
				minWidth: 240,
			},

			// {
			// 	...keyColumn(
			// 		"INQ",
			// 		createCheckboxExColumn({
			// 			size: "medium",
			// 		})
			// 	),
			// 	title: "查",
			// 	minWidth: CHECK_WIDTH,
			// 	maxWidth: CHECK_WIDTH,
			// 	// disabled: readOnly || za03.funcDisabled,
			// 	disabled: readOnly,
			// },
			{
				...keyColumn(
					"INS",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "新增",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"UPD",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "修改",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"PRT",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "列印",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"DEL",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "刪除",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"USI",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "管理",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"CHK",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "覆核",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"NCK",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "解除",
				minWidth: CHECK_WIDTH,
				maxWidth: CHECK_WIDTH,
				disabled: readOnly,
			},
			// {
			// 	...keyColumn(
			// 		"RUN",
			// 		createCheckboxExColumn({
			// 			size: "medium",
			// 		})
			// 	),
			// 	title: "執行",
			// 	minWidth: CHECK_WIDTH,
			// 	maxWidth: CHECK_WIDTH,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn(
			// 		"EXP",
			// 		createCheckboxExColumn({
			// 			size: "medium",
			// 		})
			// 	),
			// 	title: "匯出",
			// 	minWidth: CHECK_WIDTH,
			// 	maxWidth: CHECK_WIDTH,
			// 	// disabled: readOnly || za03.funcDisabled,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn(
			// 		"IMP",
			// 		createCheckboxExColumn({
			// 			size: "medium",
			// 		})
			// 	),
			// 	title: "匯入",
			// 	minWidth: CHECK_WIDTH,
			// 	maxWidth: CHECK_WIDTH,
			// 	// disabled: readOnly || za03.funcDisabled,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("Seq", createFloatColumn(2)),
			// 	title: "排序",
			// 	minWidth: 90,
			// 	maxWidth: 90,
			// 	disabled: readOnly,
			// },
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: za03.grid.gridData,
		columns,
		skipDisabled: true,
	})

	return (
		<FormMetaProvider gridMeta={gridMeta}>
			<ZA03AuthForm editing={za03.editing} />
		</FormMetaProvider>
	);
};

ZA03AuthFormContainer.displayName = "ZA03AuthFormContainer";

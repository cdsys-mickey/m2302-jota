import { FormProvider, useForm } from "react-hook-form";
import ZA03AuthForm from "./ZA03AuthForm";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { keyColumn } from "react-datasheet-grid";
import { createCheckboxExColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxExColumn";
import { useMemo } from "react";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

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
						disableFocusNext: true
					})
				),
				title: "",
				minWidth: 38,
				maxWidth: 38,
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

			{
				...keyColumn(
					"INQ",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "查",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"INS",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "增",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"UPD",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "改",
				minWidth: 38,
				maxWidth: 38,
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
				title: "印",
				minWidth: 38,
				maxWidth: 38,
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
				title: "刪",
				minWidth: 38,
				maxWidth: 38,
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
				title: "停",
				minWidth: 38,
				maxWidth: 38,
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
				title: "審",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"NCK",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "退",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"RUN",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "執",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"EXP",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "出",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"IMP",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "入",
				minWidth: 38,
				maxWidth: 38,
				// disabled: readOnly || za03.funcDisabled,
				disabled: readOnly,
			},
			{
				...keyColumn("Seq", createFloatColumn(2)),
				title: "排序",
				minWidth: 90,
				maxWidth: 90,
				disabled: readOnly,
			},
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

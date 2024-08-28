/* eslint-disable no-mixed-spaces-and-tabs */
import ProdTypeA from "./md-prod-type-a";
import ProdTypeB from "./md-prod-type-b";
import TaxTypes from "./md-tax-types";
import { v4 as uuidv4 } from "uuid";
import Objects from "@/shared-modules/sd-objects";

const hasEmptyError = (criteria) => {
	if (criteria.q) {
		return false;
	}
	return true;
};

const transformForReading = (data) => {
	const { ProdID, ProdData_N, BomFile_S, ...rest } = data;

	//StoreTrans_S
	//StoreCom_S

	return {
		prod: ProdID
			? {
					ProdID,
					ProdData: ProdData_N,
			  }
			: null,
		...(BomFile_S && {
			materials: BomFile_S.map((v) => ({
				id: uuidv4(),
				sprod: {
					ProdID: v.SProdID,
					ProdData: v.SProdData_N,
				},
				SProdData: v.SProdData_N,
				// SCost: Number(v.SCost),
				SProdQty: v.SProdQty,
				SPackData_N: v.SPackData_N,
			})),
		}),
		...rest,
	};
};

const processForDefaultSubmit = (data) => {
	return data;
};

const transformForEditorSubmit = (data, materialsGridData) => {
	const { prod, GroupKey_N, Using_N, WriteDate_N, Writer_N, ...rest } = data;

	const omitProps = {
		GroupKey_N,
		Using_N,
		WriteDate_N,
		Writer_N,
	};

	console.log("omitProps", omitProps);

	return {
		...rest,
		ProdID: prod?.ProdID || "",
		ProdData: prod?.ProdData,
		...(materialsGridData && {
			BomFile_S: materialsGridData
				.filter((v) => v.sprod)
				.map((v, i) => ({
					Seq: i,
					SProdID: v.sprod?.ProdID,
					SProdQty: v.SProdQty?.toString() || "",
				})),
		}),
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "pi,pn,bc");
};

const paramsToJsonData = (params) => {
	const where = [];

	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const A20 = {
	hasEmptyError,
	transformForReading,
	processForDefaultSubmit,
	transformForEditorSubmit,
	isFiltered,
	paramsToJsonData,
};

export default A20;

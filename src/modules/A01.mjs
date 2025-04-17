/* eslint-disable no-mixed-spaces-and-tabs */
import Objects from "@/shared-modules/Objects";
import { nanoid } from "nanoid";
import ProdTypeA from "./md-prod-type-a";
import ProdTypeB from "./md-prod-type-b";
import Reports from "./md-reports";
import TaxTypes from "./TaxTypes.mjs";

const Tabs = Object.freeze({
	INFO: "INFO",
	TRANS: "TRANS",
	COMBO: "COMBO",
	CMS: "CMS",
});

const Mode = Object.freeze({
	PROD: Symbol("PROD"),
	NEW_PROD: Symbol("NEW_PROD"),
	STORE: Symbol("STORE"),
});

const hasEmptyError = (criteria) => {
	if (criteria.q) {
		return false;
	}
	return true;
};

const transformTransGridForReading = (data) => {
	return data.map((v, i) => ({
		id: nanoid(),
		dept: {
			DeptID: v.SDeptID,
			DeptName: v.SDept_N,
		},
		SDept_N: v.SDept_N,
		// SCost: Number(v.SCost),
		SCost: v.SCost,
	}));
};

const transformComboGridForReading = (data) => {
	return data.map((v, i) => ({
		id: nanoid(),
		prod: {
			ProdID: v.SProdID,
			ProdData: v.Prod_N,
		},
		SProdData: v.Prod_N,
		// SProdQty: Number(v.SProdQty),
		SProdQty: v.SProdQty,
	}));
};

const transformCmsGridForReading = (data) => {
	return data.map((v, i) => ({
		id: nanoid(),
		dept: {
			DeptID: v.SDeptID,
			DeptName: v.SDept_N,
		},
		SDept_N: v.SDept_N,
		cmsType: {
			CodeID: v.SCmsID,
			CodeData: v.SCms_N,
		},
	}));
};

const transformForReading = (data) => {
	const {
		BUnit,
		BUnit_N,
		LClas,
		LClas_N,
		MClas,
		MClas_N,
		SClas,
		SClas_N,
		// CmsID,
		// Cms_N,
		CaseID,
		Case_N,
		SUnit,
		SUnit_N,
		IUnit,
		IUnit_N,
		MUnit,
		MUnit_N,
		Tax,
		TypeA,
		TypeB,
		StoreTrans_S,
		StoreCom_S,
		StoreCms_S,
		...rest
	} = data;

	//StoreTrans_S
	//StoreCom_S

	return {
		catL: LClas
			? {
					LClas,
					ClassData: LClas_N,
			  }
			: null,
		catM: MClas
			? {
					MClas,
					ClassData: MClas_N,
			  }
			: null,
		catS: SClas
			? {
					SClas,
					ClassData: SClas_N,
			  }
			: null,
		// cmsType: CmsID
		// 	? {
		// 			CodeID: CmsID,
		// 			CodeData: Cms_N,
		// 	  }
		// 	: null,
		counter: CaseID
			? {
					CodeID: CaseID,
					CodeData: Case_N,
			  }
			: null,
		bunit: BUnit
			? {
					CodeID: BUnit,
					CodeData: BUnit_N,
			  }
			: null,
		iunit: IUnit
			? {
					CodeID: IUnit,
					CodeData: IUnit_N,
			  }
			: null,
		sunit: SUnit
			? {
					CodeID: SUnit,
					CodeData: SUnit_N,
			  }
			: null,

		munit: MUnit
			? {
					CodeID: MUnit,
					CodeData: MUnit_N,
			  }
			: null,
		taxType: Tax ? TaxTypes.findById(Tax) : null,
		typeA: TypeA ? ProdTypeA.findById(TypeA) : null,
		typeB: TypeB ? ProdTypeB.findById(TypeB) : null,
		...(StoreTrans_S && {
			trans: transformTransGridForReading(StoreTrans_S),
		}),
		...(StoreCom_S && {
			combo: transformComboGridForReading(StoreCom_S),
		}),
		...(StoreCms_S && {
			cms: transformCmsGridForReading(StoreCms_S),
		}),
		...rest,
	};
};

const processForDefaultSubmit = (data) => {
	return data;
};

const transformForCounterSubmit = (data) => {
	const { ProdID, counter, SafeQty, cmsType } = data;
	return {
		ProdID,
		SafeQty,
		NewCaseID: counter?.CodeID ?? "",
		CmsID: cmsType?.CodeID ?? "",
	};
};

const transformTransGridForSubmit = (data) => {
	return data
		.filter((x) => !!x.dept)
		.map((v, i) => ({
			Seq: i,
			SDeptID: v.dept?.DeptID,
			SCost: v.SCost?.toString() || "",
		}));
};

const transformCmsGridForSubmit = (data) => {
	return data
		.filter((x) => x.dept?.DeptID)
		.map((v, i) => ({
			Seq: i,
			SDeptID: v.dept?.DeptID,
			SCmsID: v.cmsType?.CodeID ?? "",
		}));
};

const transformComboGridForSubmit = (data) => {
	return data
		.filter((x) => !!x.prod)
		.map((v, i) => ({
			Seq: i,
			SProdID: v.prod?.ProdID,
			SProdQty: v.SProdQty?.toString() || "",
		}));
};

const transformForEditorSubmit = (
	data,
	transGridData,
	comboGridData,
	cmsGridData
) => {
	const {
		catL,
		catM,
		catS,
		cmsType,
		counter,
		bunit,
		iunit,
		sunit,
		munit,
		taxType,
		typeA,
		typeB,
		// omit props
		dept,
		combo,
		trans,
		cms,
		Clas_N,
		Checker_N,
		GroupKey_N,
		Using_N,
		WriteDate_N,
		Writer_N,
		...rest
	} = data;

	const omitProps = {
		Clas_N,
		Checker_N,
		GroupKey_N,
		combo,
		trans,
		cms,
		dept,
		Using_N,
		WriteDate_N,
		Writer_N,
	};

	console.log("omitProps", omitProps);
	let result = {
		...rest,
	};

	// result = Forms.assignDefaultValues(
	// 	{
	// 		...rest,
	// 	},
	// 	"StdCost,TranCost,LocalCost,OutCost,SafeQty,SRate,IRate,MRate,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
	// 	0
	// );

	return {
		...result,
		LClas: catL?.LClas || "",
		MClas: catM?.MClas || "",
		SClas: catS?.SClas || "",
		CmsID: cmsType?.CodeID || "",
		CaseID: counter?.CodeID || "",
		BUnit: bunit?.CodeID || "",
		IUnit: iunit?.CodeID || "",
		SUnit: sunit?.CodeID || "",
		MUnit: munit?.CodeID || "",
		Tax: taxType?.id || "",
		TypeA: typeA?.id || "",
		TypeB: typeB?.id || "",
		...(transGridData && {
			StoreTrans_S: transformTransGridForSubmit(transGridData),
		}),
		...(comboGridData && {
			StoreCom_S: transformComboGridForSubmit(comboGridData),
		}),
		...(cmsGridData && {
			StoreCms_S: transformCmsGridForSubmit(cmsGridData),
		}),
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(
		criteria,
		"lvId,lvName,lvBarcode,lvCatL,lvCatM,lvCatS,lvCounter,lvCmsType"
	);
};

const paramsToJsonData = (mode) => (params) => {
	console.log("params", params);

	const where =
		mode === A01.Mode.NEW_PROD
			? [Reports.addParam("審核人員", "=", "")]
			: [Reports.addParam("審核人員", "<>", "")];

	if (params?.pi) {
		where.push({
			ShowName: "產品代號",
			OpCode: "LIKE",
			CondData: `%${params.pi}%`,
		});
	}
	if (params?.bc) {
		where.push({
			ShowName: "原印條碼",
			OpCode: "LIKE",
			CondData: `%${params.bc}%`,
		});
	}

	if (params?.pn) {
		where.push({
			ShowName: "產品名稱",
			OpCode: "LIKE",
			CondData: `%${params.pn}%`,
		});
	}

	if (params?.catL) {
		where.push({
			ShowName: "大分類",
			OpCode: "=",
			CondData: params.catL,
		});
	}
	if (params?.catM) {
		where.push({
			ShowName: "中分類",
			OpCode: "=",
			CondData: params.catM,
		});
	}
	if (params?.catS) {
		where.push({
			ShowName: "小分類",
			OpCode: "=",
			CondData: params.catS,
		});
	}
	if (params?.counter) {
		where.push({
			ShowName: "櫃別",
			OpCode: "=",
			CondData: params.counter,
		});
	}
	if (params?.cms) {
		where.push({
			ShowName: "佣金類別",
			OpCode: "=",
			CondData: params.cmsType,
		});
	}

	console.log("where", where);

	return {
		StdWhere: where,
		...(params?.qs && {
			CondData: {
				QS_ID: `%${params.qs}%`,
				QS_NAME: `%${params.qs}%`,
			},
		}),
	};
};

const transformAsQueryParams = (data) => {
	const {
		qs,
		lvId,
		lvName,
		lvBarcode,
		lvCatL,
		lvCatM,
		lvCatS,
		lvCounter,
		lvCmsType,
		...rest
	} = data;
	return {
		qs,
		...(lvId && {
			pi: lvId,
		}),
		...(lvBarcode && {
			bc: lvBarcode,
		}),
		...(lvName && {
			pn: lvName,
		}),
		...(lvCatL && {
			catL: lvCatL.LClas,
		}),
		...(lvCatM && {
			catM: lvCatM.MClas,
		}),
		...(lvCatS && {
			catS: lvCatS.SClas,
		}),
		...(lvCounter && {
			counter: lvCounter.CodeID,
		}),
		...(lvCmsType && {
			cms: lvCmsType.CodeID,
		}),
		// opts: 1,
		...rest,
	};
};

const A01 = {
	hasEmptyError,
	transformForReading,
	processForDefaultSubmit,
	transformForEditorSubmit,
	transformForCounterSubmit,
	isFiltered,
	Mode,
	paramsToJsonData,
	Tabs,
	transformAsQueryParams,
};

export default A01;

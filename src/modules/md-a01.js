import Forms from "@/shared-modules/sd-forms";
import ProdTypeA from "./md-prod-type-a";
import ProdTypeB from "./md-prod-type-b";
import TaxTypes from "./md-tax-types";
import { v4 as uuidv4 } from "uuid";
import Objects from "@/shared-modules/sd-objects";

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

const processForRead = (data) => {
	const {
		BUnit,
		BUnit_N,
		LClas,
		LClas_N,
		MClas,
		MClas_N,
		SClas,
		SClas_N,
		CmsID,
		Cms_N,
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
		...rest
	} = data;

	//StoreTrans_S
	//StoreCom_S

	return {
		...rest,

		...(LClas && {
			catL: {
				LClas,
				ClassData: LClas_N,
			},
		}),
		...(MClas && {
			catM: {
				MClas,
				ClassData: MClas_N,
			},
		}),
		...(SClas && {
			catS: {
				SClas,
				ClassData: SClas_N,
			},
		}),
		...(CmsID && {
			cmsType: {
				CodeID: CmsID,
				CodeData: Cms_N,
			},
		}),
		...(CaseID && {
			counter: {
				CodeID: CaseID,
				CodeData: Case_N,
			},
		}),
		...(BUnit && {
			bunit: {
				CodeID: BUnit,
				CodeData: BUnit_N,
			},
		}),
		...(IUnit && {
			iunit: {
				CodeID: IUnit,
				CodeData: IUnit_N,
			},
		}),
		...(SUnit && {
			sunit: {
				CodeID: SUnit,
				CodeData: SUnit_N,
			},
		}),

		...(MUnit && {
			munit: {
				CodeID: MUnit,
				CodeData: MUnit_N,
			},
		}),
		...(Tax && {
			taxType: TaxTypes.getById(Tax),
		}),
		...(TypeA && {
			typeA: ProdTypeA.getById(TypeA),
		}),
		...(TypeB && {
			typeB: ProdTypeB.getById(TypeB),
		}),
		...(StoreTrans_S && {
			trans: StoreTrans_S.map((v, i) => ({
				id: uuidv4(),
				dept: {
					DeptID: v.SDeptID,
					DeptName: v.SDept_N,
				},
				// SCost: Number(v.SCost),
				SCost: v.SCost,
			})),
		}),
		...(StoreCom_S && {
			combo: StoreCom_S.map((v, i) => ({
				id: uuidv4(),
				prod: {
					ProdID: v.SProdID,
					ProdData: v.Prod_N,
				},
				// SProdQty: Number(v.SProdQty),
				SProdQty: v.SProdQty,
			})),
		}),
	};
};

const processForDefaultSubmit = (data) => {
	return data;
};

const processForCounterSubmit = (data) => {
	const { ProdID, counter } = data;
	return {
		ProdID,
		NewCaseID: counter?.CodeID || "",
	};
};

const processForEditorSubmit = (data, transGridData, comboGridData) => {
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
		combo,
		trans,
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
		Tax: taxType?.Tax || "",
		TypeA: typeA?.TypeA || "",
		TypeB: typeB?.TypeB || "",
		...(transGridData && {
			StoreTrans_S: transGridData.map((v, i) => ({
				Seq: i,
				SDeptID: v.dept.DeptID,
				SCost: v.SCost,
			})),
		}),
		...(comboGridData && {
			StoreCom_S: comboGridData.map((v, i) => ({
				Seq: i,
				SProdID: v.prod.ProdID,
				SProdQty: v.SProdQty,
			})),
		}),
	};
};

const isFiltered = (criteria) => {
	return Objects.isAnyPropNotEmpty(criteria, "pi,pn,bc");
};

const A01 = {
	hasEmptyError,
	processForRead,
	processForDefaultSubmit,
	processForEditorSubmit,
	processForCounterSubmit,
	isFiltered,
	Mode,
};

export default A01;

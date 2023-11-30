import ProdTypeA from "./md-prod-type-a";
import ProdTypeB from "./md-prod-type-b";
import TaxTypes from "./md-tax-types";

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
	};
};

const processForDefaultSubmit = (data) => {
	return data;
};

const processForEditorSubmit = (data) => {
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
		Using_N,
		WriteDate_N,
		Writer_N,
	};

	console.debug("omitProps", omitProps);

	return {
		...rest,
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
	};
};

const isFiltered = (criteria) => {
	return false;
};

const A01 = {
	hasEmptyError,
	processForRead,
	processForDefaultSubmit,
	processForEditorSubmit,
	isFiltered,
};

export default A01;

/* eslint-disable no-mixed-spaces-and-tabs */
import ProdTypeA from "./md-prod-type-a";
import ProdTypeB from "./md-prod-type-b";
import TaxTypes from "./md-tax-types";

const transformForReading = (payload) => {
	return payload.data[0][`A014_W1`].map((i) => {
		const {
			LClas,
			LClas_N,
			MClas,
			MClas_N,
			SClas,
			SClas_N,
			CmsID,
			Cms_N,
			Tax,
			TypeA,
			TypeB,
			...rest
		} = i;
		return {
			catL: LClas
				? {
						LClas,
						MClas: "",
						SClas: "",
						ClassData: LClas_N,
				  }
				: null,
			catM: MClas
				? {
						LClas,
						MClas,
						SClas: "",
						ClassData: MClas_N,
				  }
				: null,
			catS: SClas
				? {
						LClas,
						MClas,
						SClas,
						ClassData: SClas_N,
				  }
				: null,
			cmsType: CmsID
				? {
						CodeID: CmsID,
						CodeData: Cms_N,
				  }
				: null,
			taxType: Tax ? TaxTypes.findById(Tax) : null,
			typeA: TypeA ? ProdTypeA.findById(TypeA) : null,
			typeB: TypeB ? ProdTypeB.findById(TypeB) : null,

			...rest,
		};
	});
};

const transformForSubmitting = (data, dirtyIds) => {
	return data
		.filter((x) => {
			if (dirtyIds && dirtyIds.size > 0) {
				return dirtyIds.has(x.ProdID);
			}
			return false;
		})
		.map((i) => {
			const {
				catL,
				catM,
				catS,
				cmsType,
				taxType,
				typeA,
				typeB,
				...rest
			} = i;
			return {
				LClas: catL?.LClas || "",
				MClas: catM?.MClas || "",
				SClas: catS?.SClas || "",
				CmsID: cmsType?.CodeID || "",
				Tax: taxType?.Tax || "",
				TypeA: typeA?.TypeA || "",
				TypeB: typeB?.TypeB || "",
				...rest,
			};
		});
};

const A014 = {
	transformForReading,
	transformForSubmitting,
};

export default A014;

/* eslint-disable no-mixed-spaces-and-tabs */
const transformForGridEdior = (payload) => {
	return payload.data[0][`A012_W1`].map((i) => {
		const {
			BUnit,
			BUnit_N,
			IUnit,
			IUnit_N,
			SUnit,
			SUnit_N,
			MUnit,
			MUnit_N,
			...rest
		} = i;
		return {
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
			...rest,
		};
	});
};

const transformForSubmit = (data) => {
	return data.map((i) => {
		const {
			ProdID,
			ProdData,
			StdCost,
			SafeQty,
			bunit,
			sunit,
			iunit,
			munit,
		} = i;
		return {
			ProdID,
			ProdData,
			StdCost,
			SafeQty,
			BUnit: bunit?.CodeID || "",
			SUnit: sunit?.CodeID || "",
			IUnit: iunit?.CodeID || "",
			MUnit: munit?.CodeID || "",
		};
	});
};

const A012 = {
	transformForGridEdior,
	transformForSubmit,
};

export default A012;
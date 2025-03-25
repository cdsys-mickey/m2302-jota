/* eslint-disable no-mixed-spaces-and-tabs */
import { nanoid } from "nanoid";

const transformForGridImport = (data) => {
	return (
		data?.map((v) => ({
			Pkey: nanoid(),
			prod: {
				ProdID: v.ProdID,
				ProdData: v.ProdData_N,
			},
			ProdData_N: v.ProdData_N,
			PackData_N: v.PackData_N,
			Seq: v.Seq,
		})) || []
	);
};

const transformGridForReading = (data) => {
	return (
		data?.map(({ SProdID, ProdData_N, PackData_N, Seq }) => ({
			prod: {
				ProdID: SProdID,
				ProdData: ProdData_N,
			},
			ProdData_N,
			PackData_N,
			Seq,
		})) || []
	);
};

const transformGridForSubmitting = (data) => {
	return data
		.filter((v) => v.prod?.ProdID)
		.map(({ prod }, index) => ({
			SProdID: prod?.ProdID,
			Seq: index + 1,
		}));
};

const transformForReading = (payload) => {
	const {
		Order,
		Message_N,
		EmplID,
		EmplData_N,
		FactID,
		FactData_N,
		PhyLst_S,
		...rest
	} = payload;

	return {
		employee: {
			CodeID: EmplID,
			CodeData: EmplData_N,
		},
		supplier: FactID
			? {
					FactID,
					FactData: FactData_N,
			  }
			: null,
		prods: transformGridForReading(PhyLst_S),
		Order: Order === "Y",
		...rest,
	};
};

const transformForSubmitting = (payload, gridData) => {
	const { PhyID, PhyData, Order, employee, supplier } = payload;
	return {
		PhyID,
		PhyData,
		Order: Order ? "Y" : "",
		EmplID: employee?.CodeID || "",
		FactID: supplier?.FactID || "",
		...(gridData && {
			PhyLst_S: transformGridForSubmitting(gridData),
		}),
	};
};

const transformAsQueryParams = (data) => {
	return {
		prod1: data.sprod?.ProdID,
		prod2: data.eprod?.ProdID,
	};
};

const P14 = {
	transformForReading,
	transformForSubmitting,
	transformAsQueryParams,
	transformForGridImport,
	transformGridForReading,
};

export default P14;


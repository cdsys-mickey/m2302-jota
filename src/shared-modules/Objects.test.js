import { it } from "vitest";
import Objects from "./Objects.mjs";
import { expect } from "vitest";

it("isAllPropsNotNull", () => {
	let obj = {
		a: "a",
		b: null,
	};
	expect(Objects.isAllPropsNotNull(obj)).toBeFalsy();
	obj.b = "b";
	expect(Objects.isAllPropsNotNull(obj)).toBeTruthy();
});

it("isAllPropsNotNull with columns", () => {
	let obj = {
		a: "a",
	};
	expect(Objects.isAllPropsNotNull(obj, "a,b,c")).toBeFalsy();

	obj.b = "b";
	obj.c = null;
	expect(Objects.isAllPropsNotNull(obj, "a,b,c")).toBeFalsy();
	expect(Objects.isAllPropsNotNull(obj, "a,b")).toBeTruthy();
});

it("isAllPropsNull", () => {
	let obj = {
		a: "a",
		b: null,
	};
	expect(Objects.isAllPropsNull(obj)).toBeFalsy();
	obj.a = null;
	expect(Objects.isAllPropsNull(obj)).toBeTruthy();
});

it("isAllPropsNull with columns", () => {
	let obj = {
		a: "a",
		b: null,
		c: null,
	};
	expect(Objects.isAllPropsNull(obj, "a,b,c")).toBeFalsy();
	obj.a = null;
	expect(Objects.isAllPropsNull(obj, "b,c")).toBeTruthy();
});

it("isAllPropsNotNullOrEmpty", () => {
	let obj = {
		a: "a",
		b: null,
		c: "",
	};
	expect(Objects.isAllPropsNotNullOrEmpty(obj)).toBeFalsy();
	obj.b = "";
	expect(Objects.isAllPropsNotNullOrEmpty(obj)).toBeFalsy();
	obj.b = "b";
	obj.c = "c";
	expect(Objects.isAllPropsNotNullOrEmpty(obj)).toBeTruthy();
});

it("isAllPropsNotNullOrEmpty with columns", () => {
	let obj = {
		a: "a",
		b: null,
		c: "",
	};
	expect(Objects.isAllPropsNotNullOrEmpty(obj, "a,b,c")).toBeFalsy();
	obj.b = "b";
	expect(Objects.isAllPropsNotNullOrEmpty(obj, "a,b,c")).toBeFalsy();
	expect(Objects.isAllPropsNotNullOrEmpty(obj, "a,b")).toBeTruthy();
});

it("should hasAllProps", () => {
	let obj = {
		a: null,
		b: "",
		c: "c",
	};
	expect(Objects.hasAllProps(obj, "a,b,c")).toBeTruthy();
	expect(Objects.hasAllProps(obj, "a,b,c,d")).toBeTruthy();
});

it("arePropsEqual", () => {
	let x = {
		DeptID: "100000",
		GroupKey: "H00",
		DeptName: "宗泰物流倉",
		AbbrName: "物流倉",
		Using_N: "1",
	};

	let y = {
		DeptID: "100000",
		GroupKey: "H00",
		DeptName: "宗泰物流倉",
		AbbrName: "物流倉",
		Using_N: false,
	};

	expect(Objects.arePropsEqual(x, y)).toBeFalsy();

	expect(
		Objects.arePropsEqual(x, y, {
			fields: "DeptID,GroupKey,DeptName,AbbrName",
		})
	).toBeTruthy();

	//測試 ignoresEmpty 參數

	x = {
		ProdID: "10000000",
		ProdData_N: "運費",
		PackData_N: "式",
		Price: "180.00",
		PriceA: "",
		PriceB: "",
		PriceC: "",
		PriceD: "",
		PriceE: "",
	};

	y = {
		ProdID: "10000000",
		ProdData_N: "運費",
		PackData_N: "式",
		Price: "180.00",
		PriceA: 1,
		PriceB: "",
		PriceC: "",
		PriceD: "",
		PriceE: "",
	};

	expect(
		Objects.arePropsEqual(x, y, {
			ignoresEmpty: true,
		})
	).toBeFalsy();

	// 測試 "" === null
	y = {
		...y,
		PriceA: null,
	};
	expect(
		Objects.arePropsEqual(x, y, {
			ignoresEmpty: true,
		})
	).toBeTruthy();
	// 測試 "" === undefined
	y = {
		...y,
		PriceA: undefined,
	};
	expect(
		Objects.arePropsEqual(x, y, {
			ignoresEmpty: true,
		})
	).toBeTruthy();
	// 測試 "" !== 0
	y = {
		...y,
		PriceA: 0,
	};
	expect(
		Objects.arePropsEqual(x, y, {
			ignoresEmpty: true,
		})
	).toBeTruthy();
});

it("isAnyPropNotEmpty", () => {
	let obj = {
		a: null,
		b: null,
		q: "",
	};

	expect(Objects.isAnyPropNotEmpty(obj, "a,b,c")).toBeFalsy();

	obj = {
		a: null,
		b: null,
		q: "",
	};
	expect(Objects.isAnyPropNotEmpty(obj, "a,b")).toBeFalsy();

	obj = {
		a: null,
		b: null,
		q: "a",
	};
	expect(Objects.isAnyPropNotEmpty(obj, "a,b")).toBeFalsy();

	obj = {
		a: null,
		b: null,
		q: "a",
		d: null,
	};
	expect(Objects.isAnyPropNotEmpty(obj, "a,b")).toBeFalsy();

	obj = {
		a: null,
		b: null,
		q: "a",
		d: "d",
	};
	expect(Objects.isAnyPropNotEmpty(obj, "a,b,c,d")).toBeTruthy();

	obj = { qs: "", pi: "", bc: "", pn: "" };
	expect(Objects.isAnyPropNotEmpty(obj, "")).toBeFalsy();
});

it("should arePropsEqual", () => {
	let obj1 = {
		a: 1,
		b: "test",
		c: false,
	};

	let obj2 = {
		a: 1,
		b: "test",
		c: true,
	};

	expect(Objects.arePropsEqual(obj1, obj2)).toBeFalsy();

	expect(Objects.arePropsEqual(obj1, obj2, { fields: "a,b" })).toBeTruthy();

	expect(Objects.arePropsEqual(obj1, obj2, { fields: "a,b,c" })).toBeFalsy();
});

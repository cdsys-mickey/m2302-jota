import { it } from "vitest";
import Objects from "./md-objects";
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

it("isAllPropsEqual", () => {
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

	expect(Objects.isAllPropsEqual(x, y)).toBeFalsy();

	expect(
		Objects.isAllPropsEqual(x, y, "DeptID,GroupKey,DeptName,AbbrName")
	).toBeTruthy();
});

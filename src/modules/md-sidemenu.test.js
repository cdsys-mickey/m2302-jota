import { test } from "vitest";
import SideMenu from "./md-sidemenu";
import { expect } from "vitest";

test("", () => {
	const moduleA00 = {
		JobID: "A00",
	};

	expect(SideMenu.isHeader(moduleA00)).toBeTruthy();
});

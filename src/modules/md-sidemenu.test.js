import { test } from "vitest";
import SideMenus from "./md-sidemenu";
import { expect } from "vitest";

test("", () => {
	const moduleA00 = {
		JobID: "A00",
	};

	expect(SideMenus.isHeader(moduleA00)).toBeTruthy();
});

import { TooltipComponent } from "./TooltipComponent";

export const ZZtooltipColumn = (opts = {}) => {
	return {
		component: TooltipComponent,
		columnData: opts,
	};
};

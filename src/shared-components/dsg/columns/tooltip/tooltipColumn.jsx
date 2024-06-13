import { TooltipComponent } from "./TooltipComponent";

export const tooltipColumn = (opts = {}) => {
	return {
		component: TooltipComponent,
		columnData: opts,
	};
};

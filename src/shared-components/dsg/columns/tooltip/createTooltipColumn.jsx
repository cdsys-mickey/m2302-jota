import { TooltipComponent } from "./TooltipComponent";

export default function createTooltipColumn(opts = {}) {
	return {
		component: TooltipComponent,
		columnData: opts,
	};
}

import { TooltipExComponent } from "./TooltipExComponent";

export default function createTooltipExColumn(opts = {}) {
	return {
		component: TooltipExComponent,
		columnData: opts,
	};
}

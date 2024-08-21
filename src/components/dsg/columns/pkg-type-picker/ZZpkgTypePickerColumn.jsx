import PkgTypes from "../../../../modules/md-pkg-types";
import PkgTypePickerComponent from "./PkgTypePickerComponent";

export const pkgTypePickerColumn = (opts) => {
	return {
		component: PkgTypePickerComponent,
		columnData: opts,
		disableKeys: true,
		keepFocus: true,
		deleteValue: () => null,
		copyValue: ({ rowData }) => PkgTypes.getOptionLabel(rowData),
		pasteValue: ({ value }) => value,
		isCellEmpty: ({ rowData }) => false,
	};
};

import { styled } from "@mui/material";

const SupplierPurchaseOrderPickerListbox = styled("ul", {
	// self props
	shouldForwardProp: (prop) => ![].includes(prop),
})(({ theme }) => ({
	paddingTop: 0,
}));

export default SupplierPurchaseOrderPickerListbox;

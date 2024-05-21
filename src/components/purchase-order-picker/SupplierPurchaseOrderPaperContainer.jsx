import { SupplierPurchaseOrderPaper } from "./SupplierPurchaseOrderPaper";

export const SupplierPurchaseOrderPaperContainer = (props) => {
	const { ...rest } = props;

	return <SupplierPurchaseOrderPaper {...rest} />;
};

SupplierPurchaseOrderPaperContainer.displayName =
	"SupplierPurchaseOrderPaperContainer";

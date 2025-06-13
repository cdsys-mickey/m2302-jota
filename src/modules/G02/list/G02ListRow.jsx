import CheckboxColumn from "@/shared-components/listview/columns/CheckboxColumn";
import ListRow from "@/shared-components/listview/ListRow";
import Forms from "@/shared-modules/Forms.mjs";
import PropTypes from "prop-types";
import { memo } from "react";
import G02AmtColumn from "./columns/G02AmtColumn";
import G02DateColumn from "./columns/G02DateColumn";
import G02IdColumn from "./columns/G02IdColumn";
import G02SupplierColumn from "./columns/G02SupplierColumn";
import G02TelColumn from "./columns/G02TelColumn";
import { useContext } from "react";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";

const G02ListRow = memo((props) => {
	const { index, style, value, onClick, onCheckChange, checked } = props;



	return (
		<ListRow style={style} onClick={onClick} checked={checked} selectText={false}>
			<CheckboxColumn
				index={index}
				checked={checked}
				onChange={onCheckChange}

				slotProps={{
					checkbox: {
						// size: "small",
						noPadding: true,
						color: "secondary"
					}
				}}
			/>
			<G02IdColumn>
				{value?.xID}
			</G02IdColumn>
			<G02DateColumn>
				{value?.xDate}
			</G02DateColumn>
			<G02SupplierColumn>
				{value?.xCustName}
			</G02SupplierColumn>
			<G02TelColumn>
				{value?.xTel}
			</G02TelColumn>
			<G02AmtColumn>
				{Forms.formatMoney(value?.xAmt)}
			</G02AmtColumn>
		</ListRow>
	);
});

G02ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	checked: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onCheckChange: PropTypes.func,
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

G02ListRow.displayName = "G02ListRow";
export default G02ListRow;


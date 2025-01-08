import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListRow from "@/shared-components/listview/ListRow";
import PropTypes from "prop-types";
import { memo } from "react";
import A06IDColumn from "./columns/A06IDColumn";
import A06NameColumn from "./columns/A06NameColumn";
import { useMemo } from "react";
import A06EmpColumn from "./columns/A06EmpColumn";
import A06BankColumn from "./columns/A06BankColumn";

const A06ListRow = memo((props) => {
	const { index, value, ...rest } = props;
	const { BankID, BankData_N, EmplData_N, AreaData_N } = value || {};

	const area = useMemo(() => {
		return [
			AreaData_N
		].filter(Boolean).join(" ");
	}, [AreaData_N])
	const employee = useMemo(() => {
		return [
			EmplData_N
		].filter(Boolean).join(" ");
	}, [EmplData_N])

	const bank = useMemo(() => {
		return [BankID, BankData_N].filter(Boolean).join(" ");
	}, [BankData_N, BankID])

	return (
		<ListRow {...rest}>
			<IndexColumn title={index}></IndexColumn>
			<A06IDColumn>
				{value?.CustID}
			</A06IDColumn>
			<A06NameColumn>
				{value?.CustData}
			</A06NameColumn>
			<A06EmpColumn>
				{area}
			</A06EmpColumn>
			<A06EmpColumn>
				{employee}
			</A06EmpColumn>
			<A06BankColumn>
				{bank}
			</A06BankColumn>
		</ListRow>
	);
});

A06ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

A06ListRow.displayName = "A06ListRow";
export default A06ListRow;

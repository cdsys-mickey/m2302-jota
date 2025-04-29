import { useFormContext, useWatch } from "react-hook-form";
import RecvAccCustomerPicker from "./RecvAccCustomerPicker";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useMemo } from "react";
import queryString from "query-string";

const RecvAccCustomerPickerContainer = () => {
	const { token } = useContext(AuthContext);

	const form = useFormContext();
	const session = useWatch({
		name: "session",
		control: form.control
	})

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			...(session?.帳款年月 && {
				ym: session?.帳款年月
			}),
			...(session?.期別 && {
				sess: session?.期別
			})
		});
	}, [session?.帳款年月, session?.期別]);

	return <RecvAccCustomerPicker querystring={querystring} bearer={token} />
}

RecvAccCustomerPickerContainer.displayName = "RecvAccCustomerPickerContainer";
export default RecvAccCustomerPickerContainer;
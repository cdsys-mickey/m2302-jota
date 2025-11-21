import { AuthContext } from "@/contexts/auth/AuthContext";
import P38 from "@/modules/P38/P38.mjs";
import UserSettings from "@/modules/UserSettings.mjs";
import { useWebApiAsync } from "@/shared-hooks";
import UserSettingEditors from "@/shared-modules/UserSettingEditor/UserSettingEditors.mjs";
import { useContext } from "react";
import { useCallback, useState } from "react";

export default function useCmsGroupTypeAlias() {
	const auth = useContext(AuthContext);
	const { httpGetAsync } = useWebApiAsync();

	const [groupAliasMap, setGroupAliasMap] = useState(
		UserSettingEditors.transformForReading(P38.DEFAULT_ALIAS_VALUES)
	);

	const loadGroupAliasMap = useCallback(async () => {
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/dept/settings`,
				bearer: auth.token,
				params: {
					id: UserSettings.KEYS.CMS_GROUP_ALIAS,
				},
			});
			if (status.success) {
				const collected =
					UserSettingEditors.transformForReading(payload);
				setGroupAliasMap(collected);
			}
		} catch (err) {
			console.error(err);
		}
	}, [auth.token, httpGetAsync]);

	return [groupAliasMap, loadGroupAliasMap];
}

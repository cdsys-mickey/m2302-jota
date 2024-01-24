import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (callback) => useEffect(callback, []);

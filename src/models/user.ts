import { useCallback, useState } from "react";

export default function useAuthModel() {
  const [user, setUser] = useState("umi");
  const fetchUser = useCallback(() => {
    setUser("fetch user demo");
  }, []);

  return { user, fetchUser };
}

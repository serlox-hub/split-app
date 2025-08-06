import { useState, useEffect, createContext, useContext } from "react";
import { useTranslations } from "next-intl";
import { getPersonByUserId } from "@/lib/api/persons";
import { getUserId } from "@/lib/util/userUtils";
import { showUnexpectedErrorToast } from "@/lib/util/toastUtils";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchPerson = async () => {
      const userId = getUserId();
      if (!userId) return;

      const result = await getPersonByUserId(userId);

      if (!result.success) {
        showUnexpectedErrorToast(t);
        return;
      }

      setUser(result.data);
    };

    fetchPerson();
  }, [t]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  return useContext(UserContext);
}

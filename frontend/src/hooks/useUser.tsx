import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { User } from "../types/user";

function useUser(id: string) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    console.log(id);

    async function fetchUser() {
      try {
        const response = await UserService.get(id);
        if (!response.error) {
          setUser(response.user);
        } else {
          setError(response.error);
        }
      } catch (err: unknown) {
        // TODO: Handle error
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, loading, error };
}

export default useUser;

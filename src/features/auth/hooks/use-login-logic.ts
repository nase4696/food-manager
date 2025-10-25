import { useSearchParams } from "next/navigation.js";
import { useActionState } from "react";

import { signInAction } from "../actions/authAction";

export function useSigninLogic() {
  const [state, formAction, pending] = useActionState(signInAction, undefined);
  const searchParams = useSearchParams();
  const from = searchParams?.get("redirect_to") || "/home";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

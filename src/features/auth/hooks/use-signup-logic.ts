import { useSearchParams } from "next/navigation.js";
import { useActionState } from "react";

import { signupAction } from "../actions/authAction";

export function useSignupLogic() {
  const [state, formAction, pending] = useActionState(signupAction, undefined);
  const searchParams = useSearchParams();
  const from = searchParams?.get("redirect_to") || "/dashboard";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

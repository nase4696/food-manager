import { useSearchParams } from "next/navigation.js";
import { useActionState } from "react";

import { SignupAction } from "../actions/authAction";

export function useSignupLogic() {
  const [state, formAction, pending] = useActionState(SignupAction, undefined);
  const searchParams = useSearchParams();
  const from = searchParams?.get("redirect_to") || "/dashboard";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

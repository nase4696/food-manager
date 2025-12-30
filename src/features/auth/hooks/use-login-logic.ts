import { useActionState } from "react";

import { LoginAction } from "#auth-actions";

export function useLoginLogic(redirectTo?: string) {
  const [state, formAction, pending] = useActionState(LoginAction, undefined);
  const from = redirectTo || "/dashboard";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

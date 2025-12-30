import { useActionState } from "react";

import { SignupAction } from "#auth-actions";

export function useSignupLogic(redirectTo?: string) {
  const [state, formAction, pending] = useActionState(SignupAction, undefined);
  const from = redirectTo || "/home";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

import { useSearchParams } from "next/navigation.js";
import { useActionState } from "react";

import { LoginAction } from "#auth-actions";

export function useLoginLogic() {
  const [state, formAction, pending] = useActionState(LoginAction, undefined);
  const searchParams = useSearchParams();
  const from = searchParams?.get("redirect_to") || "/dashboard";

  return {
    from,
    pending,
    state,
    formAction,
  };
}

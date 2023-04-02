export function authenticate(res) {
  if (!res.session.user) {
    return {
      action: {
        redirect: {
          destination: "/account/login",
          permanent: false,
        },
      },
      isValid: false,
    };
  }
  return { action: "None", isValid: true };
}

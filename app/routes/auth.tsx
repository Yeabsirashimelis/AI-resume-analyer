import { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  [
    { title: "Analize-Resume | Auth" },
    { name: "description", content: "Login into your account" },
  ];
};

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/images/bg-main.svg')] bg-cover">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 rounded-2xl bg-white p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to continue your Job Journey</h2>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    Log Out
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p> Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

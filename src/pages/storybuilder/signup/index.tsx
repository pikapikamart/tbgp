import { signIn } from "next-auth/react";
import { Auth } from "src/client/components/auth";


const SignupPage = () => {

  return (
    <main>
      <button onClick={ () => signIn(undefined, { callbackUrl: "/" }) }>login</button>
    </main>
  )
}


export default SignupPage;
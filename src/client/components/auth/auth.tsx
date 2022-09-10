import { useSignupStaff } from "@/lib/hooks";


type AuthProps = {
  csrfToken: string
}

const Auth = ( { csrfToken }: AuthProps ) => {
  const {
    form,
    addInputsRef,
    handleFormSubmit,
    mutation
  } = useSignupStaff();

  return (
    <div>
      <p>{ JSON.stringify(mutation.data) }</p>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        noValidate
        ref={ form }>
          <input
            type="hidden"
            name="csrfToken"
            defaultValue={ csrfToken } />
          <input 
            type="hidden" 
            defaultValue={"staff"} 
            name="userType" />
          <input
            type="email"
            name="email"
            ref={ addInputsRef } />
          <input
            type="password"
            name="password"
            ref={ addInputsRef } />
          <button 
            type="button"
            onClick={ handleFormSubmit } >
              log in
          </button>
      </form>
    </div>   
  )
}


export default Auth;
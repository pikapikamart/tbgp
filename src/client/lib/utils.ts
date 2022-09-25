

export const setErrors = ( element: FormFields ) => {
  element.setAttribute("aria-invalid", "true");
  element.setAttribute("aria-describedby", `error-${ element.name }`)
  element.nextElementSibling?.classList.add("show")
}

export const removeErrors = ( element: FormFields ) => {
  element.removeAttribute("aria-invalid")
  element.removeAttribute("aria-describedby")
  element.nextElementSibling?.classList.remove("show")
}

export const elementHasError = ( element: FormFields ) => {
  if ( element.name!=="email" && element.value ) {
    return false
  }

  let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/

  if ( element.name==="email" && re.test(element.value) ) {
    return false
  } 

  return true
}

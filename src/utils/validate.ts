export const isExternal = (path:string):boolean=>{
  return  /^(https?:|mailto:|tel:)/.test(path)
}

export const isValidUserName = (value:string):boolean=>{
  return value.trim().length>=0
}

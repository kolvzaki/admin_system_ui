const lists:string[] = ['/login','/400','/403','/500']

export function isTags(path:string):boolean{
  return !lists.includes(path)
}

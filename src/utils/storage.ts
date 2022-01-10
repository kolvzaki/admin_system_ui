export const Local = {

  setItem(k:string,v:any){
    if(typeof v === 'object' ){
      v = JSON.stringify(v)
    }
    localStorage.setItem(k,v)
  },
  getItem(k:string){
    let data:any = localStorage.getItem(k)
    try{
      return JSON.parse(data)
    }catch (e){
      return data
    }
  },
  removeItem(k:string){
    localStorage.removeItem(k)
  },
  clearAll(){
    localStorage.clear()
  }

}

export const Session = {
  setItem(k:string,v:any){
    if(typeof v === 'object' ){
      v = JSON.stringify(v)
    }
    sessionStorage.setItem(k,v)
  },
  getItem(k:string){
    let data:any = sessionStorage.getItem(k)
    try{
      return JSON.parse(data)
    }catch (e){
      return data
    }
  },
  removeItem(k:string){
    sessionStorage.removeItem(k)
  },
  clearAll(){
    sessionStorage.clear()
  }
}

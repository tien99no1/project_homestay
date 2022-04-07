export const isAuthenticate = () => {
    const info = window.localStorage.getItem('hostId');
    if(info){
      return true
    }else{
      return false
    }
  }
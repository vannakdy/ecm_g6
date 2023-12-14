
export const getProfile = () => {
    var profile = localStorage.getItem("profile");
    if(profile != null && profile != ""){
       return profile = JSON.parse(profile)
    }
    return null;
}

export const getMenu = () => {
    var menu = localStorage.getItem("menu");
    if(menu != null && menu != ""){
       return menu = JSON.parse(menu)
    }
    return null;
}

export const removeStorage = () => {
    localStorage.removeItem("menu") // convert object from api to string Object
    localStorage.removeItem("profile")
    localStorage.removeItem("isLogin")
}
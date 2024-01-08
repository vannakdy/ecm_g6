import moment from "moment"

export const Config = {
    image_path : "http://localhost:81/project/image_6/"
}

export const formatDateClient = (date,isShowTime=false) => {
    if(date != "" && date != null){
        var format = (isShowTime ? "DD/MM/YYYY hh:mm" : "DD/MM/YYYY")
        return moment(date).format(format)
    }
    return false;
    
}

export const getProfile = () => {
    var profile = localStorage.getItem("profile");
    if(profile != null && profile != ""){
       return profile = JSON.parse(profile)
    }
    return null;
}

export const getUserId = () => {
    const profile = getProfile();
    if(profile){
        return profile.Id;
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
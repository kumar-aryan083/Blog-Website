export const setLocal = (user, token) => {
    try {
        const u = JSON.stringify(user);
        localStorage.setItem('user', u);
        localStorage.setItem('token', token);
    } catch (error) {
        console.log(error);
    }
}

export const handleLogout = () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        console.log(error)
    }
}

export const checkValidation = async()=>{
    try {
        const res = await fetch("/api/admin/validate",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            }
        });
        const data = await res.json();
        if(res.ok){
            // console.log(data.success);
            return data.success;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}
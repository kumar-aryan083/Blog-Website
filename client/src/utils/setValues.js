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
                token: JSON.stringify(localStorage.getItem("token"))
            }
        });
        const data = res.json();
        return data.success;
    } catch (error) {
        console.log(error);
    }
}
let model = document.getElementById("modelpop")
function openModelpop() {
    model.classList.add("add_pop")



}
function closepop() {
    model.classList.remove("add_pop")
}


function usersignin() {

    let user = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let check = document.getElementById("check")
    if (user == "" || user.length <= 3) {
        alert('enter valid username')
    } else if (email == "") {
        alert("enter valid email")
    }

}


let modalClosed = false;    

let container = document.getElementById("container");

let modelpop1 = document.createElement("div");





// function openModelpop() {
//     let model = document.getElementById("modelpop")
//     model.classList.add("add_pop")


// }

// function closepop() {
//     let model = document.getElementById("modelpop")
//     model.classList.remove("add_pop");

// }


function usersignin() {

    let user = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let checkbox = document.getElementById("checkbox").required
    if (user == "" || user.length <= 3) {
        alert('enter valid username')
    } else if (email == "") {
        alert("enter valid email")
    } else if (checkbox == false) {
        alert("check")
    }

}


modelpop1.innerHTML = ` <div class="pop" id="modelpop">
        <div class="icon_x" onclick="closepop()" >x</div>

         <div id="input-boxes">

        <h3>Get $ 10 OFF WHEN YOU SIGN UP FOR  </h3>
        <h4>SAVINGS , NEWS , UPDATES AND MORE   </h4>

            <div>
           <form action="">
                <input type="text" id="username" name="username" placeholder="your name" value="" /></div>

           <div><input type="email" id="email" name="email" placeholder="email address" value="" /></div> 

           <div><input type="checkbox" id="checkbox" name="checkbox"  required/>

            <span>Check this box to receive monthly newsletter</span></div>

           <div class="singup_button" onclick="usersignin()"><button>SIGN UP</button></div>
         </form>
           <p><a href="">PRiVACY POLICY</a></p>
    </div>

<div class="logo_img">
    <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/176372/images/339bf06d957c32e3b61f79b563f229af_offerx500.png"alt="logo" class="logo"/>
</div>

</div>
</div> `

document.addEventListener("mouseleave",()=>{
    container.append(modelpop1);
})


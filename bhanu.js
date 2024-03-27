
//prevents creating  another popup if a popup is already opened and cookie is not created
let isPopupOpen = false;
navigator.cookieEnabled = true;

//should create a cookie
function createCookie(cookieName, cookieValue, expirationDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
}

// should delete a cookie 
function deleteCookie(name) {
    createCookie(name, null, null);
}

//should return a cookie
function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;

    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1)
        }
    })
    return result;
}

// should return true if cookie present 
function isCookiePresent(cookieName) {
    return document.cookie.split(";").some((item) => item.includes(cookieName));
}


// Function to validate form on submission
function validateForm() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var newsLetterCheckBox = document.getElementById("newsLetterCheckBox").checked;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/;

    var isValid = true;
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("newsLetterCheckBoxError").innerHTML = "";

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Please enter a valid email address";
        isValid = false;
    }

    if (!usernamePattern.test(username)) {
        document.getElementById("usernameError").innerHTML = "Username must be between 3 and 16 characters long and can contain letters, numbers, hyphens, and underscores";
        isValid = false;
    }

    if (!newsLetterCheckBox) {
        document.getElementById("newsLetterCheckBoxError").innerHTML = "You must agree to the privacy policy";
        isValid = false;
    }

    let formData = {
        "data": {
            username,
            email,
            newsLetterCheckBox
        },
        isValid
    };

    return formData;
}

function handleCloseClick(popup) {
    isPopupOpen = false;
    createCookie("bhanuCookie", JSON.stringify({ "name": "", "email": "", "privacyPolicy": "" }), 1);
    popup.remove();
}

function handleFormSubmission(e, popup) {
    e.preventDefault();
    const { data, isValid } = validateForm();
    if (isValid) {
        createCookie("bhanuCookie", JSON.stringify(data), 1);
        isPopupOpen = false;
        popup.remove();
    }
}

function createFormElement(placeholder, inputType, inputId) {
    var div = document.createElement("div");

    var input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    input.setAttribute("name", inputId);
    input.setAttribute("placeholder", placeholder);
    var inputStyles = "";
    if (inputType === "checkbox") {
        inputStyles = {
            "width": "auto",
            "display": "inline",
            "margin-right": "5px",
            "margin-bottom": "10px"
        }
    } else {
        inputStyles = {
            "width": "100%",
            "padding": "8px",
            "margin-bottom": "10px",
            "box-sizing": "border-box"
        }
    }

    Object.assign(input.style, inputStyles);
    div.appendChild(input);
    if (inputType === "checkbox") {
        var label = document.createElement("label");
        label.setAttribute("for", "newsLetterCheckBox");
        label.innerText = "Check this box to receive mothly newsletter.";
        div.appendChild(label);
    }

    var errorSpan = document.createElement("div");
    errorSpan.setAttribute("id", inputId + "Error");
    errorSpan.classList.add("error");
    div.appendChild(errorSpan);

    var errorSpanStyles = {
        "color": "red",
        "margin-bottom": "10px"
    }
    Object.assign(errorSpan.style, errorSpanStyles);

    return div;
}



function createPopUp(deviceType) {

    isPopupOpen = true;

    var popup = document.createElement("div");
    popup.setAttribute("class", "popup");
    popup.setAttribute("id", "exit-intent-Popup");
    var popUpStyles = {
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "background-color": "rgba(0, 0, 0, 0.5)",
        "z-index": "9999"
    };

    Object.assign(popup.style, popUpStyles)


    var popupContent = document.createElement("div");
    popupContent.setAttribute("class", "popup-content");
    var popupContentStyles = {
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "background-color": "#fff52e",
        "padding": "20px",
        "border": "1px solid #ccc",
        "box-shadow": "0 0 10px rgba(0, 0, 0, 0.2)",
        "max-width": "80%",
        "max-height": "80%",
        "overflow": "auto",
        "display": "flex",
    };
    Object.assign(popupContent.style, popupContentStyles);

    var content = document.createElement("div");
    content.setAttribute("id", "content");
    var contentStyle = {
        "display": "flex",
        "flex-direction": "column"
    };
    Object.assign(content.style, contentStyle);

    var closeButtonDiv = document.createElement("div");
    closeButtonDiv.setAttribute("id", "close-btn-container");
    var closeButtonDivStyles = {
        "display": "flex",
        "justify-content": "end"
    }
    Object.assign(closeButtonDiv.style, closeButtonDivStyles);

    var closeButton = document.createElement("span");
    closeButton.setAttribute("id", "close-btn");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("class", "modal-close");
    closeButton.innerText = "x";
    var closeButtonStyles = {
        "font-size": "24px",
        "font-weight": "bold"
    };
    Object.assign(closeButton.style, closeButtonStyles);
    closeButton.addEventListener("click", (e) => handleCloseClick(popup));
    closeButtonDiv.appendChild(closeButton);
    content.appendChild(closeButtonDiv);




    var form = document.createElement("form");
    form.setAttribute("id", "signupForm");

    var heading1 = document.createElement("div");
    heading1.setAttribute("id", "heading1");
    heading1.textContent = "GET $10 OFF WHEN YOU SIGN UP FOR";
    var heading1Styles = {
        "font-weight": "bolder"
    }
    Object.assign(heading1.style, heading1Styles);
    form.appendChild(heading1);

    var heading2 = document.createElement("div");
    heading2.setAttribute("id", "heading2");
    heading2.textContent = "SAVINGS,NEWS,UPDATES AND MORE";
    var heading2Styles = {
        "margin-bottom": "10px"
    };
    Object.assign(heading2.style, heading2Styles);
    form.appendChild(heading2);

    var usernameDiv = createFormElement("your name", "text", "username");
    form.appendChild(usernameDiv);

    var emailDiv = createFormElement("email address", "email", "email");
    form.appendChild(emailDiv);

    // Create newsLetter checkbox
    var checkboxDiv = createFormElement("Check this box to receive mothly newsletter.", "checkbox", "newsLetterCheckBox");
    form.appendChild(checkboxDiv);

    // Create submit button
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "SIGN UP");
    submitButton.addEventListener("click", (e) => handleFormSubmission(e, popup));
    var submitButtonStyles = {
        "width": "100%",
        "height": "32.5px",
        "margin-bottom": "10px",
        "background-color": "black",
        "color": "white"

    }
    Object.assign(submitButton.style, submitButtonStyles)
    form.appendChild(submitButton);

    var div = document.createElement('div');
    var privacyPolicy = document.createElement("a");
    privacyPolicy.setAttribute("href", "https://wingify.com/privacy-policy/");
    privacyPolicy.setAttribute("target", "_blank");
    privacyPolicy.innerText = "PRIVACY POLICY";
    var privacyPolicyStyles = {
        "display": "flex",
        "justify-content": "center",
    }
    div.appendChild(privacyPolicy);
    Object.assign(div.style, privacyPolicyStyles);
    privacyPolicyStyles = {
        "color": "black"
    };
    Object.assign(privacyPolicy.style, privacyPolicyStyles);
    form.appendChild(div);







    if (deviceType === "desktop") {
        var contentContainer = document.createElement("div");
        contentContainer.setAttribute("id", "content-container");
        var contentContainerStyles = {
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "width": "720px"
        }
        Object.assign(contentContainer.style, contentContainerStyles);

        var formContainer = document.createElement("div");
        div.setAttribute("id", "form-container");
        formContainer.appendChild(form);

        var popUpImageContainer = document.createElement("div");
        var image = document.createElement("img");
        image.setAttribute("id", "img-off");
        image.setAttribute("src", "https://useruploads.visualwebsiteoptimizer.com/useruploads/176372/images/339bf06d957c32e3b61f79b563f229af_offerx500.png");
        image.setAttribute("alt", "Christmas sale Upto 50% OFF");
        popUpImageContainer.appendChild(image);

        var imageStyles = {
            "height": "300px",
            "min-width": "100px"
        }
        Object.assign(image.style, imageStyles);

        contentContainer.appendChild(formContainer);
        contentContainer.appendChild(popUpImageContainer);


        content.appendChild(contentContainer);
    } else {
        content.appendChild(form);
    }
    popupContent.appendChild(content);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}



function createPopUpForMobile() {

    setTimeout(() => {
        if (!isPopupOpen && !isCookiePresent("bhanuCookie")) {
            createPopUp("mobile");
        }
    }, 5000);
}

function createPopUpForDesktop() {

    document.body.addEventListener("mouseleave", (e) => {

        if (!isPopupOpen && !isCookiePresent("bhanuCookie")) {
            createPopUp("desktop");
        }
    });

}

function findDeviceType() {


    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {

        if (navigator.userAgent && window.innerWidth && window.innerHeight) {

            function isMobileBrowser() {

                userAgent = navigator.userAgent;

                var mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;


                return mobileRegex.test(userAgent);
            }


            var isMobile = isMobileBrowser();

            if (isMobile) {
                return "mobile";
            } else {
                return "desktop";
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}



(function main() {


    const deviceType = findDeviceType();

    if (deviceType === "mobile") {
        createPopUpForMobile();

    } else if (deviceType === "desktop") {
        createPopUpForDesktop();
    } else {
        console.error("This script is intended to execute on desktop or mobile devices browser only. Do not execute at every place. we are not responsible for your data");
    }

})();
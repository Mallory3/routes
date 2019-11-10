document.getElementById("submit").onclick = function() {
  const displayname = document.getElementById("name").value;
  const displayemail = document.getElementById("email").value;
  if (!displayname || !displayemail) {
    alert("Please complete all required fields")
    window.location.href = "/";
  } else {
  alert("Thankyou " + displayname 
  + " please check " + displayemail 
  + " for your newsletter!")
  window.location.href = "/";
  }
};

const button = document.querySelector('#submit');
const paragraph = document.querySelector('#display');
const displayname = document.getElementById("name").value;

button.addEventListener('click', updatehtml);

function updatehtml() {
  if (button.value === 'submit') {
    form.style.display ="none";
    const displayname = document.getElementById("name").value;
    const displayemail = document.getElementById("email").value;
    paragraph.textContent = "Thankyou for subscribing to my newsletter " + displayname + "! Your first newsletter will be emailed to " + displayemail + " You will be redirected to the homepage in 10 seconds. Otherwise, click the link below to return home.";
    const homeButton = document.createElement('button')
    homeButton.innerHTML = "Return Home"
    homeButton.setAttribute('onclick', "location.href='/success'")
    document.body.appendChild(homeButton)
  }
  setTimeout(function () {
   window.location.href= '/success';
   updatehtml
}, 10000);
}
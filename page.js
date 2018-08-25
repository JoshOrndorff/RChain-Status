"use strict"

window.addEventListener("DOMContentLoaded", () => {

  var nameBox = document.getElementById("name")
  var registerButton = document.getElementById("register")
  var newStatusBox = document.getElementById("new-status")
  var setStatusButton = document.getElementById("set-status")

  var friendBox = document.getElementById("friend-name")
  var checkButton = document.getElementById("check-status")
  var friendStatusP = document.getElementById("friend-status")



  registerButton.addEventListener("click", () => {
    console.log("register button pressed")

    $.ajax({
      // Kinda hacky way to transmit data.
      // Not sure why this gets encoded properly, but it does :)
      url: "/register?name=" + nameBox.value,
      type: "POST"
    }).done( res => {
      console.log("response was: ", res)
    })
  })


  checkButton.addEventListener("click", () => {
    var userName = friendBox.value
    console.log("Checking status for " + userName)

    $.ajax({
      url: "/check?name=" + userName,
      type: "POST"
    }).done( result => {
      console.log("response was: ", result)
      friendStatusP.innerHTML = result
    })
  })



  setStatusButton.addEventListener("click", () => {
    var newStatus = newStatusBox.value
    var userName = nameBox.value

    var url = `/set?name=${userName}&status=${newStatus}`
    console.log(url)

    $.ajax({
      url: url,
      type: "POST"
    }).done( result => {
      console.log("response was: ", result)
    })
  })
})

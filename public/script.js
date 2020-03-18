const info = document.getElementById("info")

const fetchTotal = async () => {
    const response = await fetch("http://localhost:3009/data")
    const total = await response.json()
    info.textContent = total.data
}

fetchTotal()

const button = document.getElementById("sendEmail")
const input = document.getElementById("myInput")

button.addEventListener("click", () => {
    fetch("http://localhost:3009/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: input.value
        })
    })
    window.location.reload()
})

input.addEventListener("keyup", () => {
    if(event.keyCode == 13){
        button.click()
    }
})
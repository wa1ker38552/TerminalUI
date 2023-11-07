function inputChange() {
  fetch("/command", {
    method: "POST",
    body: JSON.stringify({
      "command": input.value
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.output == "\u001b[H\u001b[2J\u001b[3J") {
        output.innerHTML = ""
        input.value = ""
      } else {
        const outputCommand = document.createElement("div")
        const outputText = document.createElement("pre")
        const pathObj = document.createElement("div")
        const outputObj = document.createElement("div")
        pathObj.className = "accent"
        pathObj.innerHTML = `~${path.innerHTML} $`
        outputObj.innerHTML = input.value
        outputCommand.className = "terminal-line"
        outputCommand.append(pathObj, outputObj)
        outputText.innerHTML = response.output
        path.innerHTML = response.path
        if (response.error) {
          outputText.style.color = "red"
          outputText.style.textShadow = "red 0 0 10px"
        }
        output.append(outputCommand, outputText)
        input.value = ""
        window.scrollTo(0, document.body.scrollHeight)
      }
    })
}

var output, input, path
window.onload = function() {
  output = document.querySelector("#output")
  input = document.querySelector("#terminalInput")
  path = document.querySelector("#directory")
  input.focus()

  document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      input.focus()
      if (output.children.length >= 2) {
        input.value = ""
        input.value = output.children[output.children.length-2].children[1].innerHTML
      }
    } else if (e.key === "Enter") { 
      e.preventDefault()
      inputChange()
    }
  })

  input.onchange = function(e) {
    inputChange()
  }
}

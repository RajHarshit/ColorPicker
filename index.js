const getSchemeBtn = document.getElementById("get-scheme")


getSchemeBtn.addEventListener("click", ()=> {
    const seedColor = document.getElementById("seed-color").value.slice(1)
    // API being used (The Color API) requires the hexadecimal color without the #. 
    // applying .slice(1), the code removes the # to make the value compatible 
    // with the API's requirements.

    const schemeMode = document.getElementById("scheme-mode").value

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors
            const colorDisplay = document.getElementById('color-display')
            colorDisplay.innerHTML = ''

            colors.forEach(color => {
                const colorBox = document.createElement('div')
                colorBox.className = 'color-box'
                colorBox.style.backgroundColor = color.hex.value

                const colorHex = document.createElement('span')
                colorHex.textContent = color.hex.value

                const copyMsg = document.createElement('div')
                copyMsg.className = 'copy-msg'
                copyMsg.textContent = 'Copied!'
                colorBox.appendChild(copyMsg)

                colorBox.addEventListener('click', () => {
                    navigator.clipboard.writeText(color.hex.value).then(() => {
                        copyMsg.classList.add('show');
                        setTimeout(() => {
                            copyMsg.classList.remove('show');
                        }, 300);
                    })
                })

                colorBox.appendChild(colorHex)
                colorDisplay.appendChild(colorBox)


            })
        })

        // .catch(error => console.error('Error fetching color scheme:', error))
})

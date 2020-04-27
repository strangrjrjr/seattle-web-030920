document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => loadPups(json))
})

let dogFilter = document.getElementById('good-dog-filter')
dogFilter.addEventListener('click', function() {
    // find dog attribute
    if (dogFilter.innerText === "Filter good dogs: OFF") {
        dogFilter.innerText = "Filter good dogs: ON"
        console.log(document.getElementsByClassName("false"))
        let badDogs = document.getElementsByClassName("false")
        for (let dog of badDogs) {
            dog.style.display = 'none'
        }
    } else {
        console.log("click")
        dogFilter.innerText = "Filter good dogs: OFF"
        let dogBar = document.getElementById("dog-bar").children 
        for (let dog of dogBar) {
            dog.style.display = 'initial'
        }
    }
})

function loadPups(pups) {
    let dogBar = document.getElementById('dog-bar')
    for (const pup of pups) {
        let dogSpan = document.createElement('span')
        dogIsGood = pup.isGoodDog
        dogSpan.classList.add(dogIsGood)
        dogSpan.innerText = pup.name
        dogSpan.addEventListener('click', function(e){
            
            let dogInfo = document.getElementById('dog-info')
            dogInfo.innerHTML = ""
            let dogPic = document.createElement('img')
            dogPic.src = pup.image
            let dogTitle = document.createElement('h2')
            dogTitle.innerText = dogSpan.innerText
            let dogBtn = document.createElement('button')
            dogBtn.id = pup.id
            if(dogIsGood){
                dogBtn.innerText = "Good Dog!"
            } else {
                dogBtn.innerText = "Bad Dog!"
            }
            dogBtn.addEventListener('click', function(e){
                toggleDog(e.target)
            })
            dogInfo.appendChild(dogPic)
            dogInfo.appendChild(dogTitle)
            dogInfo.appendChild(dogBtn)
        })
        dogBar.appendChild(dogSpan)
    }
}

function toggleDog(dog){
    
    let goodDog
    if (dog.innerText === "Good Dog!"){
        goodDog = true
        dog.innerText = "Bad Dog!"
    } else {
        goodDog = false
        dog.innerText = "Good Dog!"
    }
    //fetch with patch request
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({isGoodDog : goodDog}),
        })
        .then (res => res.json())
        .then (json => console.log(json))
        // need to update span for filter
    }
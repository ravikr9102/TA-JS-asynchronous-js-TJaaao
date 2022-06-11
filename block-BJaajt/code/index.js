const img = document.querySelector('.img');
const name = document.querySelector('h3');
const following = document.querySelector('.following');
const followers = document.querySelector('.followers');
const input = document.querySelector('input');

function displayUI(data){
    img.src = data.avatar_url;
    name.innerText = data.name;
    following.innerText = `Following: ${data.following}`;
    followers.innerText = `Followers: ${data.followers}`
};

function handleChange(event){
    if(event.keyCode === 13){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
        xhr.onload = function (){
            let userData = JSON.parse(xhr.response);
            displayUI(userData);
        };
        xhr.onerror = function(){
            console.log('Something went wrong...')
        };
        xhr.send();
        event.target.value = "";
    }
}

input.addEventListener('keyup', handleChange);


 

 const catImg = document.querySelector('img');
 const catBtn = document.querySelector('button');

 catBtn.addEventListener('click', () => {
    let cat = new XMLHttpRequest();

    cat.open('GET',`https://api.thecatapi.com/v1/images/search?limit=1&size=full`);
    cat.onload = function(){
        let imageData = JSON.parse(xhr.response);
        catImg.src = imageData.urls.small;
    };
    cat.onerror = function(){
        console.log(`Something went Wrong...`);
    };
    cat.send();
 });


// 66OOcKdD2P1IB2KBV8miMx2wb2OOi5XSbYM0_iVEmxQ
// https://api.unsplash.com/photos/random/?client_id=YOUR_ACCESS_KEY
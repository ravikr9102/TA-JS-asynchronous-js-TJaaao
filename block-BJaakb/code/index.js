let text = document.querySelector('.bar');
let images = document.querySelector('.images')

function createUI(datainfo) {
    images.innerHTML=""
    datainfo.forEach((ele) => {
        let img = document.createElement('img')
        img.style.marginBottom="20px"
        img.src = ele;
        images.append(img);
    })
}

function handleChange(event) {
    console.log(event.keyCode)
    if (event.keyCode === 13) {
        console.log(event.target.value);
          let alldata =  data.results.reduce((acc, cv) => {
                acc.push(cv.urls.small)
                console.log(acc);
                return acc;
            }, [])
            createUI(alldata)
            event.target.value=""      
        };
    }
text.addEventListener('keyup', handleChange)


function fetch(url){
    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject('Error!');
        xhr.send();
    })
};

let data = fetch(`https://api.unsplash.com/search/photos?query&client_id=gidJ1IIqV-j8NKZ42zssvM7k7bHKkb4aFZ682ZNqNC4`)
.then(createUI)
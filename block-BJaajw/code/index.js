let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let root = document.querySelector('.news');
let select = document.querySelector('select');
let main = document.querySelector('.main');
let error = document.querySelector('.error');
let allNews = [];

function handleErrorMessage(message = 'Something Went Wrong!'){
    main.style.display = "none";
    root.style.display = 'block';
    root.innerText = message;
}

function handleSpinner(status = false){
    if(status){
        root.innerHTML = `<div class="donut"></div>`
    }
}


function createUI(news){
    root.innerHTML = "";
    news.forEach(elm => {
        let div = document.createElement('div');
        div.classList.add('center')
        let img = document.createElement('img');
        img.classList.add('width')
        img.src = elm.imageUrl;
        let div2 = document.createElement('div');
        div2.innerText = elm.newsSite;
        div2.style.fontSize = "1.3rem";
        div.style.fontWeight = "800";
        let h3 = document.createElement('h3');
        h3.innerText = elm.title;
        let a = document.createElement('a');
        a.href = elm.url;
        let btn = document.createElement('button');
        a.append(btn);
        btn.innerText = 'Read More';
        btn.href = elm.url;
        div.append(img,div2,h3,a);
        root.append(div);
    });
}

function displayOptions(sources){
    sources.forEach((source) => {
        let option = document.createElement('option');
        option.innerText = source;
        option.value = source;
        select.append(option);
    });
}

function init(){
    handleSpinner();
    fetch(url)
.then((resolve) => {
    if(resolve.ok){
        return resolve.json();
    } else{
        throw new Error('Resolve not ok!')
    }
})
.then((news) => {
    handleSpinner();
    allNews = news
    createUI(news);

    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOptions(allSources);
}).catch(error => {
    handleErrorMessage(error)
}).finally(() => {
    handleSpinner();
})
}

select.addEventListener('click', (event) => {
    let source = event.target.value.trim();
    let filteredNews;
    if(source) {
         filteredNews = allNews.filter((news) => news.newsSite === source);
    } else{
        filteredNews = allNews;
    }
    createUI(filteredNews)
});

if(navigator.onLine){
    init()
} else{
    handleErrorMessage('Check your internet connection')
}

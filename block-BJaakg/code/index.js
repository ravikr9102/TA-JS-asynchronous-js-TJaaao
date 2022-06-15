 let container = document.querySelector('.container');
 let root = document.querySelector('ul');

 let url = `https://www.anapioficeandfire.com/api/books`;

   fetch(url)
    .then((res) => res.json())
     .then((books) => {
       createUI(books);
    }) .catch((error) => error);



 function createUI(data) {
     let cardContainer = document.querySelector('.card-container');
   data.forEach((book) => {
    let charCount = book.characters.length;
    let card = document.querySelector('.card');
     let h2 = document.createElement('h2');
    h2.innerText = book.name;
    let p = document.createElement('p');
     p.innerText = book.authors;

    let charContainer = document.createElement('div');
    charContainer.classList.add('charContainer');
    let h3 = document.createElement('h3');
     h3.innerText = 'Charaacters';
    h3.classList.add('heading');
     charContainer.append(h3);

    let btn = document.createElement('a');
    btn.innerText = `Show Characters ${charCount}`;
    btn.classList.add('btn');
    card.append(h2, p, charContainer, btn);

     btn.addEventListener('click', () => {
      charContainer.style.display = 'inline-block';
      let span = document.createElement('span');
      span.innerText = '❌';
      charContainer.append(span);

book.characters.forEach((char) => {
    fetch(char)
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        let ul = document.createElement('ul');
        let name = document.createElement('li');
        let gender = document.createElement('li');
        let tvseries = document.createElement('li');
        let aliases = document.createElement('li');
        obj.tvSeries.forEach((season) => {
          tvseries.innerText = tvseries.innerText + ` ${season}`;
        });
        obj.aliases.forEach((cv) => {
          aliases.innerText = aliases.innerText + ` ${cv}`;
        });
        name.innerText = obj.name;
        gender.innerText = obj.gender;

        ul.append(name, gender, tvseries, aliases);

        charContainer.append(ul);
      })
      .catch((error) => error);
  });

  span.addEventListener('click', () => {
    charContainer.style.display = 'none';
  });
});
});
container.append(cardContainer);
}



function handler(event) {
    event.preventDefault();

    let movie = document.querySelector('.form__input').value;

    if (movie) {
        const _url = `https://www.omdbapi.com/?s=${movie}&apikey=fd39f5cd`
        const _options = {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            cache: 'default'
        }


        fetch(_url, _options)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao executar requicição')
                return response.json();
            })
            .then(json => createCard(json))

        const createCard = (json) => {

            const listFilm = document.querySelector('.list-film');

            listFilm.innerHTML = '';
             console.log(json)
            
            json.Search.forEach(element => {
                const div = document.createElement("div");
                const title = document.createElement("h2");
                const image = document.createElement("img");

                const classes = `col-sm-6 col-md-4 col-lg-3 mb-4 border border-2 p-4 m-2`;
                const classList = classes.split(' ');

                for (let i = 0; i < classList.length; i++) {
                div.classList.add(classList[i]);
                }
                div.classList.add(`data-bs-target="#Modal${element.imdbID}`)
                image.classList.add('img-fluid')
                title.innerText = element.Title;
                image.setAttribute('src', `${element.Poster}`)
                div.appendChild(title)
                div.appendChild(image)
                listFilm.appendChild(div);

                
            });

        }

    } else {

        alert('Digite um nome de filme')
    }

}

window.onload = () => {

    const submit = document.querySelector('.form__submit')
    submit.addEventListener('click', handler)

}


    function handler(event) {
        event.preventDefault();
        const movie = document.querySelector('.form__input').value;
        if (movie) {
            const _url = `https://www.omdbapi.com/?s=${movie}&apikey=fd39f5cd`;
            const _options = {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                cache: 'default'
            };
            fetch(_url, _options)
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao executar requicição');
                    return response.json();
                })
                .then(json => createCard(json));
        } else {
            alert('Digite um nome de filme');
        }
    }

    function createCard(json) {

        const card_film = document.querySelector('.card-film');
        const listFilm = document.querySelector('.list-film');
        listFilm.innerHTML = '';
        json.Search.forEach(element => {
            const div = document.createElement('div');
            const title = document.createElement('p');
            const image = document.createElement('img');
            const classes = 'col-sm-6 col-md-4 col-lg-3 card-movie';
            div.classList.add(...classes.split(' '));
            div.setAttribute('data-bs-target', `#Modal${element.imdbID}`);
            image.classList.add('img-fluid');
            title.classList.add('text-film');
            title.classList.add('text-film-w');
            title.innerText = element.Title;
            image.setAttribute('src', `${element.Poster}`);
            div.appendChild(title);
            div.appendChild(image);
            listFilm.appendChild(div);

            div.addEventListener('mouseover', () => {
                title.classList.remove('text-film-w');
            });
            div.addEventListener('mouseout', () => {
                title.classList.add('text-film-w');
            });
            card_film.classList.add('card-film-style')

            // evento de clique para abrir o modal
            div.addEventListener('click', () => {
                const modalId = `Modal${element.imdbID}`;
                const existingModal = document.querySelector(`#${modalId}`);
                if (existingModal) {
                    const modalInstance = new bootstrap.Modal(existingModal);
                    modalInstance.show();
                } else {
                    const modal = document.createElement('div');
                    modal.classList.add('modal', 'fade', 'show');
                    modal.setAttribute('id', modalId);
                    modal.setAttribute('tabindex', '-1');
                    modal.setAttribute('aria-labelledby', 'modalLabel');
                    modal.setAttribute('aria-hidden', 'true');
                    modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalLabel">${element.Title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex">
                  <div class="me-3"><img src="${element.Poster}" alt="Poster do filme"></div>
                  <div class="more-info">
                    <img style="width:10%" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?"/>                                      
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          `;
                    document.body.appendChild(modal);
                    const modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                    // Nova requisição para obter mais informações do filme
                    const imdbID = element.imdbID;
                    const _url = `https://www.omdbapi.com/?i=${imdbID}&apikey=fd39f5cd`;
                    const _options = {
                        method: 'GET',
                        mode: 'cors',
                        redirect: 'follow',
                        cache: 'default'
                    };
                    fetch(_url, _options)
                        .then(response => {
                            if (!response.ok) throw new Error('Erro ao executar requicição');
                            return response.json();
                        })
                        .then(json => {
                            const moreInfo = document.querySelector(`#${modalId} .more-info`);
                            moreInfo.innerHTML = `
                <p>Ano: ${json.Year}</p>
                <p>Genero: ${json.Genre}</p>
                <p>Duração: ${json.Runtime}</p>
                <p>Diretor: ${json.Director}</p>
                <p>Escritor: ${json.Writer}</p>
                <p>Atores: ${json.Actors}</p>
                <p>Enredo: ${json.Plot}</p>
              `;
                        });
                }
            });
        });
    }

    window.onload = () => {
        const submit = document.querySelector('.form__submit');
        submit.addEventListener('click', handler);
    };

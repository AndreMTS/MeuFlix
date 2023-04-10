
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

                    json.Search.forEach(element => {
                        const div = document.createElement("div");
                        const title = document.createElement("h2");
                        const image = document.createElement("img");

                        const classes = `col-sm-6 col-md-4 col-lg-3 mb-4 border border-2 p-4 m-2`;
                        const classList = classes.split(' ');

                        for (let i = 0; i < classList.length; i++) {
                            div.classList.add(classList[i]);
                        }
                        div.setAttribute('data-bs-target', `#Modal${element.imdbID}`);

                        image.classList.add('img-fluid')
                        title.innerText = element.Title;
                        image.setAttribute('src', `${element.Poster}`)
                        div.appendChild(title)
                        div.appendChild(image)
                        listFilm.appendChild(div);

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
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">${element.Title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${element.Poster}" class="img-fluid" alt="Poster do filme">
                        <p>Ano de Lançamento: ${element.Year}</p>
                        <p>Ano de Lançamento: ${element.Genre}</p>
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
                            }
                        });
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


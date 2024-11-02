const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto de Perfil do Usuario" />
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>

                                                <div>
                                                    <p class="followers">${user.followers} followers 👥</p>
                                                    <p class+"following">${user.following} following 👤</p>
                                                </div>
                                            </div>
                                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}

                                                                        <div class="repo-informations">
                                                                            <p>🍴 ${repo.forks}</p>
                                                                            <p>⭐ ${repo.stargazers_count}</p>
                                                                            <p>👀 ${repo.watchers_count}</p>
                                                                            <p>👨🏻‍💻 ${repo.language ?? "Não possui línguagens"}</p>
                                                                        </div>
                                                                    </a>
                                                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ''
        user.events.forEach((events) => {
            if (events.type === 'PushEvent') {
                eventsItens += `<li class="event">
                                    <p class="event-name">${events.repo.name}</p>
                                    <p class="event-message"> | ${events.payload.commits[0].message}</p>
                                </li>`
            } else {
                eventsItens += `<li>
                                    <p class="event-name">${events.repo.name}</p>
                                    <p class="event-message"> | Sem mensagem de commit</p>
                                </li>`
            }
        })

        this.userProfile.innerHTML += `<div class="events">
                                            <h2>Eventos</h2>
                                            <ul class="list-events">${eventsItens}</ul>
                                        </div>`
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
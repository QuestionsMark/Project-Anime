import { HOST_ADDRESS } from "../config";

export default function setMain(main, match) {
    if (main) {
        const path = match.path;
        switch (path) {
            case '/users/:id':
                fetch(`${HOST_ADDRESS}/users/${match.params.id}/background`)
                    .then(res => res.json())
                    .then(background => {
                        main.style.backgroundImage = `url(${HOST_ADDRESS}/images/${background})`;
                    })
                    .catch(e => console.log(e));
                break;
            case '/anime/:animeID':
                fetch(`${HOST_ADDRESS}/anime/${match.params.animeID}/background`)
                    .then(res => res.json())
                    .then(background => {
                        main.style.backgroundImage = `url(${HOST_ADDRESS}/images/${background})`;
                    })
                    .catch(e => console.log(e));
                break;
            default:
                main.style = '';
                break;
        }
    }
}
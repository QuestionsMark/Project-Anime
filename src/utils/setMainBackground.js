import { HOST_ADDRESS } from "../config";

export async function setMainBackground(main, { pathname }) {
    if (!main) return;
    if (pathname.includes('/users/')) {
        const userId = pathname.slice(7, 31);
        const response = await fetch(`${HOST_ADDRESS}/users/${userId}/background`);
        if (!response.ok) return;
        const background = await response.json();
        main.style.backgroundImage = `url(${HOST_ADDRESS}/images/${background})`;
    } else if (pathname.includes('/anime/')) {
        const animeId = pathname.slice(7, 31);
        const response = await fetch(`${HOST_ADDRESS}/anime/${animeId}/background`);
        if (!response.ok) return;
        const background = await response.json();
        main.style.backgroundImage = `url(${HOST_ADDRESS}/images/${background})`;
    } else {
        main.style = '';
    }
}
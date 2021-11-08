import { HOST_ADDRESS } from "../config";

async function setContexts(id) {
    const usersResponse = await fetch(`${HOST_ADDRESS}/users`);
    const users = await usersResponse.json();

    const animeResponse = await fetch(`${HOST_ADDRESS}/anime`);
    const anime = await animeResponse.json();

    let user;
    if (id) {
        const userResponse = await fetch(`${HOST_ADDRESS}/users/${id}`);
        user = await userResponse.json();
    }

    // const animeOnTopResponse = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
    // const animeOnTop = await animeOnTopResponse.json();

    // const dailyAnimeResponse = await fetch(`${HOST_ADDRESS}/daily-anime/actual`);
    // const dailyAnime = await dailyAnimeResponse.json();

    // const whatsTheMelodyResponse = await fetch(`${HOST_ADDRESS}/whats-the-melody/actual`);
    // const whatsTheMelody = await whatsTheMelodyResponse.json();

    // const SAOCRankingResponse = await fetch(`${HOST_ADDRESS}/sword-art-online-clicker/ranking`);
    // const SAOCRanking = await SAOCRankingResponse.json();

    return {
        users,
        anime,
        user,
        // animeOnTop,
        // dailyAnime,
        // whatsTheMelody,
        // SAOCRanking,
    }
}

export default setContexts;
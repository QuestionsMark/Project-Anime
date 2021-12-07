import { HOST_ADDRESS } from "../config";

async function setContexts(id) {
    // const usersResponse = await fetch(`${HOST_ADDRESS}/users`);
    // let users = [];
    // if (usersResponse.ok) {
    //     users = await usersResponse.json();
    // }

    // const animeResponse = await fetch(`${HOST_ADDRESS}/anime`);
    // let anime = [];
    // if (animeResponse.ok) {
    //     anime = await animeResponse.json();
    // }

    // const typesResponse = await fetch(`${HOST_ADDRESS}/types`);
    // let types = [];
    // if (typesResponse.ok) {
    //     types = await typesResponse.json();
    // }

    let user = {};
    if (id) {
        const userResponse = await fetch(`${HOST_ADDRESS}/users/${id}`);
        if (userResponse.ok) {
            user = await userResponse.json();
        }
    }

    // const animeOnTopResponse = await fetch(`${HOST_ADDRESS}/anime-on-top/actual`);
    // let animeOnTop = null;
    // if (animeOnTopResponse.ok) {
    //     animeOnTop = await animeOnTopResponse.json();
    // }

    // const dailyAnimeResponse = await fetch(`${HOST_ADDRESS}/daily-anime`);
    // let dailyAnime = null;
    // if (dailyAnimeResponse.ok) {
    //     dailyAnime = await dailyAnimeResponse.json();
    // }

    // const whatsTheMelodyResponse = await fetch(`${HOST_ADDRESS}/whats-the-melody/actual`);
    // let whatsTheMelody = null;
    // if (whatsTheMelodyResponse.ok) {
    //     whatsTheMelody = await whatsTheMelodyResponse.json();
    // }

    // let whatsTheMelodyComments = [];
    // if (whatsTheMelody) {
    //     const whatsTheMelodyCommentsResponse = await fetch(`${HOST_ADDRESS}/whats-the-melody/${whatsTheMelody.id}/comments`);
    //     if (whatsTheMelodyCommentsResponse.ok) {
    //         whatsTheMelodyComments = await whatsTheMelodyCommentsResponse.json();
    //     }
    // }

    // const SAOCRankingResponse = await fetch(`${HOST_ADDRESS}/sword-art-online-clicker`);
    // let SAOCRanking = [];
    // if (SAOCRankingResponse.ok) {
    //     SAOCRanking = await SAOCRankingResponse.json();
    // }

    return {
        user,
    }
}

export default setContexts;
import { HOST_ADDRESS } from "../config";

export async function callApi(path, defaultData) {
    const response = await fetch(`${HOST_ADDRESS}/${path}`);
    if (response.ok) {
        return response.json();
    } else {
        return defaultData;
    }
}
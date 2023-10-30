

export async function getData(url) {
    let dataEast;
    let error;
    try {
        let result = await fetch(url)
        dataEast = await result.json();
    }
    catch (err) {
        console.error(err);
        error = err;
    }
    return { dataEast, error}
}


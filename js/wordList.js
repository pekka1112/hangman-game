export const fetchData = async () => {
    let wordList = [];
    try {
        const response = await fetch('./server/action/get.php');
        if (response.status === 404) {
            throw new Error('Resource not found (404)');
        }
        if(!response.ok){
                throw new Error('Network response was not ok ' + response.statusText);
            }
            wordList = await response.json();
    } catch (error){
        console.error('There has been a problem with your fetch operation:', error);
    }
    return wordList;
}
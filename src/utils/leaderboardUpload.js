export default async function leaderboardUpload(score) {
    alert('Leaderboard will be available soon!');
    location.reload();
    return;
    
    const name = prompt("Please enter your name", "");
    if (name !== null) {
        if (name === "") {
            alert("Please enter a valid name");
            leaderboardUpload(score);
            return;
        }
        const data = { name, score };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        // const response = await fetch("/.netlify/functions/leaderboard", options);
        // const json = await response.json();
        // console.log(json);
        alert("Your score has been uploaded!");
    } else {
        const isSure = confirm("Are you sure? Unsaved scores will be lost.");
        if (!isSure) {
            leaderboardUpload(score);
            return;
        }
    }
    location.reload();
}
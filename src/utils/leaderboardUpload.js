export default async function leaderboardUpload(score) {
    const name = prompt("Please enter your name", "");
    if (name !== null) {
        if (name === "") {
            alert("Please enter a valid name");
            leaderboardUpload(score);
            return;
        }
        if (name.length > 20) {
            alert("Please enter a name with less than 20 characters");
            leaderboardUpload(score);
            return;
        }
        const data = {
            Leaderboard: {
                Name: name,
                Score: score,
            },
            Key: "V03I6ts97yHJye34hhv8WzoubYQ2tbk97mKIlvo9qq",
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch("https://sailor-mr-moon-api.azurewebsites.net/Leaderboard/Add", options);
            const json = await response.json();
            if (json) {
                alert("Your score has been uploaded!");
            } else {
                alert("Something went wrong. Please try again.");
                leaderboardUpload(score);
                return;
            }
        } catch (err) {
            alert("Temporary Server Error. Please try again.");
            leaderboardUpload(score);
            return;
        }
    } else {
        const isSure = confirm("Are you sure? Unsaved scores will be lost.");
        if (!isSure) {
            leaderboardUpload(score);
            return;
        }
    }
    location.reload();
}
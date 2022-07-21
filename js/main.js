const links = [
    {
        label: "Week One",
        url: "weekOne/index.html"
    },
    {
        label: "Week Two",
        url: "weekTwo/index.html"
    },
    {
        label: "Week Three",
        url: "weekThree/index.html"
    },
    {
        label: "Week Four",
        url: "weekFour/index.html"
    },
    {
        label: "Week Five",
        url: "weekFive/index.html"
    },
    {
        label: "Week Seven",
        url: "weekSeven/index.html"
    },
    {
        label: "Week Eight",
        url: "weekEight/index.html"
    },
    {
        label: "Week Nine",
        url: "weekNine/index.html"
    }, 
    {
        label: "Week Ten",
        url: "weekTen/index.html"
    },
    {
        label: "Challenge One",
        url: "challengeOne/index.html"
    },
    {
        label: "Challeng Two",
        url: "challengeTwo/mealSelector.html"
    }
]
for (i = 0; i < links.length; i++) {
    document.getElementById("directory").innerHTML += "<li class = 'menu'><a href = '" + links[i]["url"] + "'>" + links[i]["label"] + "</a></li>"
}
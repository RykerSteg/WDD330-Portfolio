const links = [
    {
        label: "Week One",
        url: "weekOne/index.html"
    },
    {
        label: "Week Two",
        url: "weekTwo/index.html"
    }
]
for (i = 0; i < links.length; i++) {
    document.getElementById("directory").innerHTML += "<li><a href = '" + links[i]["url"] + "'>" + links[i]["label"] + "</a></li>"
}
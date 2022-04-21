const links = [
    {
        label: "Week One",
        url: "weekone/index.html"
    },
    {
        label: "Week Two",
        url: "weektwo/index.html"
    }
]
for (i = 0; i < links.length; i++) {
    document.getElementById("directory").innerHTML += "<li><a href = '" + links[i]["url"] + "'>" + links[i]["label"] + "</a></li>"
}
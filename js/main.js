const links = [
    {
        label: "Week1 Notes",
        url: "week1/index.html"
    }
]

list = document.getElementById("directory")

for (label in links) {
	txt = links[label]
}
for (url in links) {
	link = links[url]
}
document.getElementById("p1").innerHTML = "<li>" + "<a href = '"+ link + "'" +  txt + ">" + "</li>";
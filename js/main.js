const links = [
    {
        label: "Week1 Notes",
        url: "week1/index.html"
    }
]

list = document.getElementById("directory")
let txt = ""
for (label in links) {
	txt = links[label]
}
let link = ""
for (url in links) {
	link = links[url]
}
document.getElementById("p1").innerHTML = "<li>" + "<a href = '"+ link + "'" +  txt + ">" + "</li>";
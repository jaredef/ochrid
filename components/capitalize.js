export default() => {
    var textElement = document.getElementById("title");
    var textContent = textElement.textContent.toLowerCase();
    var words = textContent.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    textElement.textContent = words.join(" ");
}
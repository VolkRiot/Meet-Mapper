/* Set the width of the side navigation to 250px Opening Function */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0. Close Function */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/* Side Nav Open On Click */
$("#slideoutNav").on("click", function () {
	openNav()
});

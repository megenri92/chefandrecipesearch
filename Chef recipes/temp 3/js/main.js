/* -------------------     Chefs    ---------------------- */
//List of all Chefs and recipes
var allChefs = document.getElementsByClassName('chef-recipe');
// Assign an ID to every chef
for (var i = 0; i < allChefs.length; i++) {
	allChefs[i].id = "chef" + i;
}
var chefsToDisplay = allChefs;
var currentPage = 1;
var pagesTotal;

// //Turn off display of all chefs
var displayNone = function() {
	for (var i = 0; i < allChefs.length; i++) {
		allChefs[i].style.display = 'none';
	}
}
/* -------------------     Page Numbers    ---------------------- */
// Active Class function to pages
var addClassActive = function() {
	$('#page' + currentPage).addClass('active');
}
// Remove Class Active function
var removeClassActive = function() {
	for (var i = 1; i <= pagesTotal; i++) {
		$('#page' + i).removeClass('active');
	}
	addClassActive();
}

// Page first loads to first 10 chefs
var loadPage = function() {
	displayNone(); // Turn off display of all chefs
	var tenOrLess;
	if (chefsToDisplay.length >= 10) {
		tenOrLess = 10;
	} else {
		tenOrLess = chefsToDisplay.length;
	}
	for (var i = 0; i < tenOrLess; i++) {
		chefsToDisplay[i].style.display = 'block'; 
	}
	
	removeClassActive();
}
/* -------------------- Setting up number of Pages ------------------ */
var pageCountInitial = function() {
	// Figure out how many pages need to display 10 chefs/page max.
	pagesTotal = Math.ceil(chefsToDisplay.length / 10);
	if (pagesTotal > 1) {
		// Add previous button
		$('.page').append('<nav aria-label="Page navigation"><ul class="pagination"></ul></nav>');
		$('.pagination').append('<li><a href="#" aria-label="Previous" id="prev"><span aria-hidden="true">&laquo;</span></a></li>');
		// Append page buttons
		for (var i = 1; i < pagesTotal + 1; i++) {
			$('.pagination').append('<li><a href="#" id="page' + i + '">' + i + '</a></li>');
		}
		// Next Button
		$('.pagination').append('<li><a href="#" aria-label="Next" id="next"><span aria-hidden="true">&raquo;</span></a></li>');
	}
	loadPage();
}
var pageCount = function() {
	pagesTotal = Math.ceil(chefsToDisplay.length / 10);
	console.log(pagesTotal);
	$('.pagination li a').css('display', 'none');
	if (pagesTotal > 1) {
		$('#prev').css('display', 'block');
		$('#next').css('display', 'block');
		for (var i = 1; i < pagesTotal + 1; i++) {
			$('#page' + i).css('display','block');
		}
	}
	
	loadPage();
}
// Function displays 10 or fewer chefs
var pageDisplay = function(page) {
	displayNone();
	var highNumber = parseInt(String(page) + '0');
	var lowNumber = highNumber - 10;
	
	// If there are less than 10 chefs to display
	if (chefsToDisplay[highNumber] === undefined) {
		highNumber = chefsToDisplay.length;
	}
	// Turn on display of chefs lowNumber to highNumber
	for (var i = lowNumber; i < highNumber; i++) {
		chefsToDisplay[i].style.display = 'block';
	}
	// Reassign active page
	removeClassActive();
}
/* -------------------     Search Bar    ---------------------- */
// Create Search Bar
var searchCreate = function() {
	$('.page-header').append('<div class="chef-search"><input placeholder="type in name of chef"><button>Find Me</button></div>');
}
searchCreate();
//Search Function
var searchButton = function() {
	currentPage = 1;
	displayNone();
	var find = $('.chef-search input').val().toLowerCase();
	console.log(find);
	chefsToDisplay = [];
	console.log(chefsToDisplay);
	
	// go through chefs
	for (var i = 0; i < allChefs.length; i++) {
		var chef = $('#chef' + i + ' h3').text();
		// If there is a match
		if (chef.indexOf(find) > -1) {
			// Turn on chef display
			chefsToDisplay.push(allChefs[i]);
			console.log(allChefs[i]);
		}
	}
	// Clear Search Bar
	$('.chef-search input').val("");
	// If there are 0 matches
	if (chefsToDisplay.length === 0) {
		// If no chefs are found then display "Invalid Search"
		$('#noMatch').css('display', 'block');
	} else { // If there are chefs found
		$('#noMatch').css('display', 'none');
	}
	// Load chefs and count pages needed
	pageCount();
}
// Click on Search Button
$('.chef-search button').on('click', function() {
	// If no entry in search bar then load default page
	if ($('.chef-search input').val() === "" || $('.chef-search input').val().length === 0) {
		currentPage = 1;
		// Load Default page
		chefsToDisplay = allChefs;
		pageCount();
		return;
	} else {
		searchButton(); // Otherwise trigger the button
		return;
	}
})
// Enter button triggers Search Button
$(".chef-search input").keyup(function(event){
    if(event.keyCode === 13){
        $(".chef-search button").click();
    }
});
// Page Click
var pageClick = function () {
	// Grab ID of page
	var page = this.id;
	console.log(page);
	// Page options you may click on
	if (page === "prev") { // Previous button
		if (currentPage !== 1) {
			currentPage = currentPage - 1; // If the current page is not one it can go backwards
		}
	} else if (page === "next") { // Next button
		if (currentPage !== pagesTotal) {
			currentPage = currentPage + 1; // If the current page is not the max page it can move forward
		}
	} else {
		// Grab solely the number of page id
		currentPage = parseInt(page.substring(4));
	}
	// Pass Number to function
	pageDisplay(currentPage);
}
$(document).ready(function() {
	$('.pagination li a').on('click', pageClick);
});
// Onload Functions
pageCountInitial(); // Loads Default page with 25 chefs

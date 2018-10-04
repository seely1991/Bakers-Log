//fades the input fields when first loaded
function load() {
	setTimeout(function () {$("#load").fadeIn(1000);}, 800);
}

//establishing data for volume to weight conversions using object notation
class item {
	constructor(name, weight) {
		this._name = name;
		this._weight = weight;
	}
	get name() {
		return this._name
	}
	get weight() {
		return this._weight
	}
	convertWeightTo(unit) {
		if (unit === "oz") {
			return Math.round(this._weight * 0.03527396195 * 100)/100 + "oz"
		}
	}
}

//creating classes for each ingredient for use with volume to weight conversion
const flour = new item("flour",125);
const bakingPowder = new item("baking powder", 192);
const bakingSoda = new item("baking soda", 6*48);
const brownSugar = new item("brown sugar", 200);
const butter = new item("butter", 227);
const breadFlour = new item("bread flour", 127);
const cakeFlour = new item("cake flour", 120);
const wholeWheatFlour = new item("whole wheat flour", 120);
const milk = new item("milk", 227);
const peanutButter = new item("peanut butter", 270);
const powderedSugar = new item('powdered sugar', 125);
const salt = new item('salt', 6*48);
const sourdoughStarter = new item('sourdough starter', (227+241)/2);
const sugar = new item('sugar', 200);
const water = new item('water', 225);
const cocoaPowder = new item('cocoa powder', 100);
const shortening = new item('shortening', 192);
const darkCornSyrup = new item('dark corn syrup', 328);
const jimBeamWhiskey = new item('whiskey', 8*24);

//all item objects listed in an array for easy access
const itemList = [flour, bakingSoda, bakingPowder, brownSugar, butter, breadFlour, cakeFlour, wholeWheatFlour, milk, peanutButter, powderedSugar, salt, sourdoughStarter, sugar, water, cocoaPowder, darkCornSyrup, shortening, jimBeamWhiskey]

//global variable used for making unique id name for each list item
let listNum = 1;

function showOther () {
	//if unit measure is something other than options listed (for instance 'pinch' or 'dash' gives the user ability to input own unit (does not work with conversions)
	if ($("#input").val() === 'other') {
		$("#other").show();
		$("#input").hide();
		$("#hideOther").show();
	}else{$("#other").hide();
	}
}

$("#hideOther").on('click', function () {
	//exits out of the 'other' tab in the input field
	$("#other").hide();
	$("#input").show();
	$("#" + this.id).hide();
	$("#input").val("cup")
})

$("#add").on('click', function () {
	//function to add item,
	//used grep to find item in the itemList array
	let x = $.grep(itemList, function (n, i) {
		return n.name === $("#item").val().toLowerCase();
	})

	//variables to be used in conversions
	let itm = x[0];
	let units;
	let weight = 1;
	let $input = $("#input").val();
	let $output = $("#output").val();
	//sets initial measurement as cups to be converted in the following switch
	let cups = $("#qty").val();
	//sets the itm object if it is not found
	if (x.length === 0) {itm = {name: $("#item").val(), weight: 0,}}

	switch($input){
			//sets the weight and cups data in accordance with the chosen unit
			case "cup":
			break;
			case "floz":
				weight /= 8;
				cups /= 8;
			break;
			case "tbsp":
				weight /= 16;
				cups /= 16
			break;
			case "tsp":
				weight /= 48;
				cups /= 48;
			break;
			case "other":
			weight = "NA";
			$input = $("#other").val();
	}

	switch($("#output").val()){
			//converts the chosen unit
			case "g":
				units = "g";
				weight = Math.round(weight*$("#qty").val()*itm.weight*100)/100;
				break;
			case "oz":
				units = "oz";
				weight *= Math.round(weight*$("#qty").val()*itm.weight*0.03527396195*100)/100
				break;
			case "NA":
				break;
			case "cup":
				units = " cup";
				weight = Math.round(cups*100)/100;
				break;
			case "floz":
				units = " floz";
				weight = Math.round((cups*100)*8)/100;
				break;
			case "tsp":
				units = " tsp";
				weight = Math.round((cups*100)*48)/100;
				break;
			case "tbsp":
				units = " tbsp";
				weight = Math.round((cups*100)*16)/100;
				break

	}
	if ($("#item").val()) {
	//list item to be displayed taking into account potential errors caused by missing information (either on users side or within the volume to weight conversion objects)
	if (weight === 0) { weight = "Info Not Found"; units = ""}
	
	if ($output === "NA" && $input === "") {
		$("#list").append("<div id=\"listItem" + listNum + "\" style=\"display: none\"><div class=\"listText\">" + $("#qty").val() + " " + itm.name + " " + $input + "</div><button id=\"" + listNum +"\" type=button id=" + "\"list" + listNum + "\"" + "class=\"xBton delete\"><div class=\"buttonText\">&times;</div></button><br></div>");
	
	}else if ($output === "NA" && $input !== ""){
		$("#list").append("<div id=\"listItem" + listNum + "\" style=\"display: none\"><div class=\"listText\">" + $("#qty").val() + " " + $input + " " + itm.name + "</div><button id=\"" + listNum +"\" type=button id=" + "\"list" + listNum + "\"" + " class=\"xBton delete\"><div class=\"buttonText\">&times;</div></button><br></div>");
	
	}else{
		$("#list").append("<div id=\"listItem" + listNum + "\" style=\"display: none\"><div class=\"listText\">" + weight + units + " " + itm.name + "</div><button id=\"" + listNum +"\" type=button id=" + "\"list" + listNum + "\"" + "class=\"xBton delete\"><div class=\"buttonText\">&times;</div></button><br></div>")
}
	//testing to see id's of each list item
	let idName = "listItem" + listNum.toString()
	console.log(idName)
	$("#" + idName).slideDown(300);

	//increments the global variable listNum to make a unique id used to delete specific items and have others unaffected
	listNum ++;
	//delete items by checking the x in the item div
	$(".delete").on('click', function () {
		$("#" + this.id).parent().slideUp(300);
		setTimeout( function () {$("#" + this.id).parent().remove()},310)
	});

}})

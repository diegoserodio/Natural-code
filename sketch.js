//Create arrays for objects
let gen = [], feast = [];

//Define parameters
let genSize = 20, feastSize = 10;
let feastMinLife = 500, feastMaxLife = 2000;
let backgroundColor = 50;

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Generate beings generation
	for(let i = 0; i < genSize; i++){
		gen[i] = new Being(50, 255);
	}

	//Generate food
	for(let i = 0; i < feastSize; i++){
		let durability = Math.floor(Math.random() * feastMaxLife);
		if(durability<feastMinLife)durability=feastMinLife;
		feast[i] = new Food(durability, backgroundColor);
	}
}

function draw() {
	background(backgroundColor);
	noStroke();

	//Show food on screen
	feast.map(food => food.render())

	//Process beings on screen
	gen.map(being => {
		being.walk();
		//Food interaction
		for(let i = 0; i < feast.length; i++){
			if(being.encounterFood(feast[i])){
				break;
			}
		}
		being.show();
	})
}

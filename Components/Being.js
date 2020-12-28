class Being {
  constructor(size, color) {
    //Phenotype
    this._size = size;
    this._viewField = size*4;
    this._color = color;
    this._fieldColor = 'rgba(100,100,100, 0.35)';

    //Properties
    this._pos = {
      x: Math.floor(Math.random() * windowWidth),
  		y: Math.floor(Math.random() * windowHeight)
    };
    this._speed = 2;
    this._hungry = 0;
    this._seesFood = false;
    this._alive = true;
  }

  increaseHungry(rate){
    this._hungry += rate;
    if(this._hungry>=255) this._alive=false;
  }

  walk(){
    let direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case 0:
        this._pos.x+=this._speed
        break;
      case 1:
        this._pos.x-=this._speed
        break;
      case 2:
        this._pos.y+=this._speed
        break;
      case 3:
        this._pos.y-=this._speed
        break;
      default:
        break;
    }
    //Prevents going off screen
    if(this._pos.x<0)this._pos.x=0
    else if(this._pos.x>windowWidth)this._pos.x=windowWidth
    if(this._pos.y<0)this._pos.y=0
    else if(this._pos.y>windowHeight)this._pos.y=windowHeight
  }

  encounterFood(food){
    //Calculate if it sees the food
    let foodPos = food.pos, beingPos = this._pos;
    let foodSize = food.size;
    let dx = foodPos.x-beingPos.x+foodSize/2, dy = foodPos.y-beingPos.y+foodSize/2;
    let dist = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));
    //Set the basis
    this._seesFood = false;
    this._fieldColor='rgba(100,100,100, 0.35)';
    //If it sees food
    if(dist<=this._viewField/2+foodSize/2){
      this._fieldColor='rgba(255,255,255, 0.35)';
      this._seesFood = true;
    }
    //If it eats food
    if(dist<=this._size/2+foodSize/2){
      this._hungry=0;
      food.disapear();
    }
    return this._seesFood;
  }

  show(){
    //Only shows if it isn't dead
    if(this._alive){
      let { x, y } = this._pos;
      let barSize = this._size*2;
      let barColor = [this._hungry, 255-this._hungry, 0]
      //Draw the field view
      fill(this._fieldColor);
      ellipse(x, y, this._viewField);
      //Draw the being
      fill(this._color);
      ellipse(x, y, this._size);
      //Draw the hungry bar
      fill(barColor[0], barColor[1], barColor[2]);
      rect(x-barSize/2, y-this._size-5, barSize, 5);
      //Makes it hungrier
      this.increaseHungry(0.1);
    }
  }
}

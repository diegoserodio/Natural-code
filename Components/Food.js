class Food {
  constructor(durability, backgroundColor, size=10) {
    this._pos = {
      x: Math.floor(Math.random() * windowWidth),
      y: Math.floor(Math.random() * windowHeight)
    }
    this._durability = durability;
    this._lifespan = 0;
    this._size = size;
    this._background = backgroundColor;
  }

//Getters
  get size(){
    return this._size;
  }
  get pos(){
    return this._pos;
  }

//Setters
  set pos(pos){
    this._pos=pos;
  }
  set size(size){
    this._size=size;
  }

  //Generate food
  render(){
    fill(255,255,0);
    rect(this._pos.x, this._pos.y, this._size, this._size);
    this._lifespan++;
    if(this._lifespan>this._durability)this.disapear();
  }

  disapear(){
    fill(this._background);
    rect(this._pos.x, this._pos.x, this._size, this._size);
    this.reapear();
  }

  reapear(){
    this._lifespan = 0;
    this._pos.x = Math.floor(Math.random() * windowWidth);
    this._pos.y = Math.floor(Math.random() * windowHeight);
    this.render();
  }
}

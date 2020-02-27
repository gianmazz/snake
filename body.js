class Body{
  constructor(x, y, dimensionX, dimensionY){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.b = dimensionX;
    this.h = dimensionY;
    this.color = [0, 0, 0];
  }

  update(vx, vy){
    if ((vx !== 0) || (vy !== 0)){
      this.vx = vx;
      this.vy = vy;
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    
  }

  draw(){
    push();
    fill(this.color[0], this.color[1], this.color[2]);
    rect(this.x, this.y, this.b, this.h);
    pop();
  }
}
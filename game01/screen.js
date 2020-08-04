class Screen {
    constructor(ratio_h,ratio_v) {
        this.canvas = document.createElement( 'Canvas' );
        this.bufferCanvas = document.createElement( 'Canvas' );

        this.context= this.canvas.getContext('2d');
        this.bufferContext= this.bufferCanvas.getContext('2d');
  
        document.body.style.overflow = 'hidden';
        document.body.style.margin  = '0 auto';
        document.body.style.backgroundColor='black';
        document.body.appendChild(this.canvas);

        this.canvas.style.backgroundColor='white';
        this.canvas.style.margin  = '0 auto';

        this.ratio_h = ratio_h;
        this.ratio_v = ratio_v;
        this.init();
    }

    init() {
        this.width = 0;
        this.height = 0;
        while (this.width <= window.innerWidth && this.height <=window.innerHeight){
            this.width+=this.ratio_h;
            this.height+=this.ratio_v;
        }
        this.x = (window.innerWidth - this.width)/2;
        this.y = (window.innerHeight - this.height)/2;
    
        this.canvas.width=this.width;
        this.canvas.height=this.height;
      
        this.bufferCanvas.width=this.width;
        this.bufferCanvas.height=this.height;

        this.canvas.style.position = 'absolute';
        this.canvas.style.left = this.x + 'px';
        this.canvas.style.top = this.y + 'px';

        this.scale = this.width * 0.00196;
    }

    push(){
        this.context.drawImage(this.bufferCanvas, 0, 0);
        this.bufferContext.fillStyle = "green";
        this.bufferContext.fillRect(0, 0, this.width, this.height);
    }
}
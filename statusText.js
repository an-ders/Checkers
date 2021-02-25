function StatusText(screenSize, extraSize){
    this.text = 'Test';
    this.extraSize = extraSize;
    this.screenSize = screenSize;

    this.show = function (){
        textSize(35);
        fill(245,245,245);
        text(this.text, 10, this.screenSize-15+this.extraSize);
    }
    this.setText = function(string){
        this.text = string;
    }
}
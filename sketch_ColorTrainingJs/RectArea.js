// =========================================================
//  Class Implementation
//      Rectangle Area Class (1x1)
// =========================================================
class RectArea {
  
  constructor(x, y, w, h, v) {
    this.pX = x;
    this.pY = y;
    this.bW = w;
    this.bH = h;
    this.pltNum = 0;
    this.areaColor = color("#FFFFFF");
    this.visible = v;
  }
  
  display() {
    if( this.visible ) {
      // 四角形を描画
      fill(this.areaColor);
      rect(this.pX, this.pY, this.bW, this.bH);
    }
  }
  
  isClicked(msX, msY) {
    let ret = false;
    if( this.visible ) {
      // 四角形領域をクリックしたか？
      if(  (this.pX < msX) && (msX < (this.pX + this.bW)) && (this.pY < msY) && (msY < (this.pY + this.bH)) ) {
        ret = true;
      }
    }
    return ret;
  }
  
  setBounds(x, y, w, h) {
    this.pX = x;
    this.pY = y;
    this.bW = w;
    this.bH = h;
    trainingData.isSaved = false;  // データ更新したので保存フラグをクリアしておく
  }
  
  setColor(pnum) {
    // ユーザが選択したパレット番号を保存
    this.pltNum = pnum;
    // ユーザが選択した色値を保存
    this.areaColor = cPalette.getColor(pnum);
    trainingData.isSaved = false;  // データ更新したので保存フラグをクリアしておく
    // debug
    console.log("setColor: ", pnum, " RGB= ", this.areaColor);
  }
  
  setVisible(v) {
    this.visible = v;
  }
  
  getPaletteNum() {
    // 設定されているパレット番号を取得
    return this.pltNum;
  }
  
}

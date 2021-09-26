// =========================================================
//  Class Implementation
//      Pickup Color Class
// =========================================================
class PickUpColor {
  
  constructor(pltX, pltY, pltW, pltH) {
    this.pXorig = pltX;
    this.pYorig = pltY;
    this.bWframe = pltW;
    this.bHframe = pltH;
    
    this.pNumX = 0;
    this.pNumY = 0;
    this.pNumM = 0;
    this.bW = 0;
    this.bH = 0;
    this.paletteGap = 0;
    this.paletteNum = 0;                // colorTbl #=0(白) を初期値とする
    this.selColor = color("#FFFFFF");   // RGB=FF FF FF (`白)
    
    this.colorTbl = colorTable;
  }
  
  readColorInfo() {
    let rowcnt = this.colorTbl.getRowCount();  // 読み込みファイルには #=0(白) データを含んでいるので利用時は注意
    
    // 横方向パレット数設定
    if( rowcnt == 157 ) {
      this.pNumX = 13;                  // 156色は13設定
    } else {
      this.pNumX = 10;                  // 130,140,150色は10固定
    }
    this.pNumY = (rowcnt-1) / this.pNumX + 1;
    this.pNumM = (rowcnt-1) % this.pNumX;
    this.bW = this.bWframe / this.pNumX;
    this.bH = this.bHframe / this.pNumY;
    
    // sRGB, RGBいずれかの値をcolor列に設定する
    let valRGB = new Array(3);  // 0:R   1:G   2:B
    for(let i = 0; i < rowcnt; i++) {
      // RGBを設定(sRGBを使うときはここを変更する)
      valRGB[0] = this.colorTbl.getNum(i, "R");
      valRGB[1] = this.colorTbl.getNum(i, "G");
      valRGB[2] = this.colorTbl.getNum(i, "B");
      // テーブルに変換値を保存
      let rgbColor = color(valRGB);
      this.colorTbl.setString(i, "color", rgbColor.toString("#rrggbb"));
      //console.log(valRGB[0] , valRGB[1] , valRGB[2], rgbColor.toString("#rrggbb"));
    }
  }
  
  display() {
    // キャプション表示
    fill(0);
    textSize(16);
    text("カラーパレット", this.pXorig, this.pYorig-25);
    text("（クリックして選択→右ウィンドウの□枠をクリック）", this.pXorig, this.pYorig-10);
    text("選択されている色", this.pXorig+60, this.pYorig+this.bHframe+10);
    
    // カラーパレットを描画
    for(let j = 0; j < this.pNumY; j++) {
      for(let i = 0; i < this.pNumX; i++) {
        // 最後の行を途中まで描画する場合を判定
        if( (j == this.pNumY-1) && (i >= this.pNumM) ) {
          break;
        }

        let idx = (j * this.pNumX) + i + 1;
        let pnum = 0;
        if( params.SIZE_N45PALETTE ) {
          let row = this.colorTbl.matchRow(str(idx), "n45");
          pnum = row.getNum("num");
        } else {
          pnum = idx;
        }

        let row = this.colorTbl.matchRow(str(pnum), "num");
        fill(row.getString("color"));
        // パレット枠の間隙を白or黒の隙間で空ける場合、_paletteGapを設定する
        rect(this.pXorig+(i*this.bW), this.pYorig+(j*this.bH), this.bW-this.paletteGap, this.bH-this.paletteGap);
        // debug
        //if(i==0 && j==0) console.log(pnum , row.getString("color"));
      }
    }
    
    // ユーザーが選択した色を描画
    fill(this.selColor);
    rect(this.pXorig+60, this.pYorig+(this.pNumY*this.bH)+30, this.bWframe*0.7, 670-this.bHframe);
    
    // ユーザが選択した色を数値で表示（アドバイザ機能）
    //@todo  ★
  }
  
  latchColor(msX, msY) {
    // ユーザーが選択した色値を設定する(130,140,150,156 or 45色パレット用)
    // 個別のパレットを判定し、パレット定義色を設定する
    for(let j = 0; j < this.pNumY; j++) {
      for(let i = 0; i < this.pNumX; i++) {
        // 最後の行を途中まで描画する場合を判定
        if( (j == this.pNumY-1) && (i >= this.pNumM) ) {
          break;
        }

        let x = this.pXorig + (i * this.bW);
        let y = this.pYorig + (j * this.bH);
        let idx = 0;

        // パレットをクリックされたか？
        if(  (x < msX) && (msX < (x + this.bW))
          && (y < msY) && (msY < (y + this.bH)) ) {
          // クリックされたパレットテーブルの行番号を設定
          idx = (j * this.pNumX) + i + 1;
          if( params.SIZE_N45PALETTE ) {
            let row = this.colorTbl.matchRow(str(idx), "n45");
            this.paletteNum = row.getInt("num");
          } else {
            this.paletteNum = idx;
          }
          // クリックされたパレットの定義色を設定
          this.selColor = this.getColor(this.paletteNum);
          // debug
          console.log(this.paletteNum, "[latch]RGB: ", red(this.selColor), green(this.selColor), blue(this.selColor));
        }
      }
    }
  }
  
  mousePressedLeft(msX, msY) {
    // 左ボタンが押されたら、カラーパレットから色値を取得
    if( this.isClicked(msX, msY) ) {
      this.latchColor(msX, msY);  // パレットクラス内で選択色をラッチ保持する
    }
  }
  
  mousePressedRight(msX, msY) {
    // 右ボタンが押されたら、クリック場所の色番号を取得（アドバイズ機能）
    // T.B.D. ★
  }
  
  isClicked(msX, msY) {
    let ret = false;
    // パレット全領域のクリック判定
    if(  (this.pXorig < msX) && (msX < (this.pXorig + this.bWframe))
      && (this.pYorig < msY) && (msY < (this.pYorig + this.bHframe)) ) {
      ret = true;
    }
    return ret;
  }
  
  getColor(pnum) {
    // 現在選択されている色値を取得
    let row = this.colorTbl.matchRow(str(pnum), "num");
    let c = row.getString("color");
    // debug
    console.log(pnum, c, " RGB: ", red(c), green(c), blue(c));
    return c;
  }
  
  getPaletteNum() {
    // 現在選択されているパレットの番号を取得
    return this.paletteNum;
  }
  
  setColor(c) {
    // ユーザーが選択した色値を外部から設定する(cWheel使用時)
    this.selColor = c;
    // debug
    console.log("[cW]RGB = ", red(this.selColor), ", ", green(this.selColor), ", ", blue(this.selColor));
  }
  
  setPaletteNum(pnum) {
    // パレット番号を外部から設定（デバッグ用）
    this.paletteNum = pnum;
    // パレットの定義色を設定
    this.selColor = this.getColor(this.paletteNum);
  }
  
}

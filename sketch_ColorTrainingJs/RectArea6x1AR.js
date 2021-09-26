// =========================================================
//  Class Implementation
//      Rectangle Area Class (3x1 + 3x1 with AreaRate)
//      @note   パレット1個分の幅、高さを設定すること
//              並べたパレットは同じ幅で表示される
// =========================================================
class RectArea6x1AR {
  
  constructor(x, y, w, h, v) {
    // パレット配列
    this.ra = new RectArea(6);    // 0-2:固定幅   3-5:可変幅（面積比用）
    
    // パレット2連配置
    this.ra[0] = new RectArea(x,     y, w, h, v);
    this.ra[1] = new RectArea(x+w,   y, w, h, v);
    this.ra[2] = new RectArea(x+w*2, y, w, h, v);
    
    // 可変幅（面積比用）
    this.pXar = new int(4);
    this.pXar[0] = x + w*3 + 20;
    this.pXar[1] = this.pXar[0] + w;
    this.pXar[2] = this.pXar[0] + w*2;
    this.pXar[3] = this.pXar[0] + w*3;
    
    this.ra[3] = new RectArea(this.pXar[0], y, w, h, v);
    this.ra[4] = new RectArea(this.pXar[1], y, w, h, v);
    this.ra[5] = new RectArea(this.pXar[2], y, w, h, v);
    
    this.pYar = y;
    this.pHar = h;
    this.bWar = new int(3);
    this.bWar[0] = w;
    this.bWar[1] = w;
    this.bWar[2] = w;
    this.bWframe = w * 3;    // 可変幅パレット全体（3個分）の幅
    this.ofsX = 0;
    
    this.areaRate = new float(3);
    this.areaRate[0] = 0.3333;
    this.areaRate[1] = 0.3333;
    this.areaRate[2] = 0.3333;
    
    this.visible = v;
    
    this.RADIUS = 8;
  }
  
  drawDiamond(x, y, r) {
    let R;
    // スライドバーアイコン
    push();
    translate(x, y);
    beginShape();
    for(let i = 0; i < 4; i++) {
      if(i % 2 == 0) {
        R = r * 3 / 4;
      } else {
        R = r;
      }
      vertex(R*cos(radians(90*i)), R*sin(radians(90*i)));
    }
    endShape();
    pop();
  }
  
  drawTriangle(x, y, r) {
    let R = r;
    // スライドバーアイコン
    push();
    translate(x, y);
    rotate(radians(90));
    beginShape();
    for(let i = 0; i < 3; i++) {
      vertex(R*cos(radians(360*i/3)), R*sin(radians(360*i/3)));
    }
    endShape();
    pop();
  }
  
  display() {
    if( this.visible ) {
      // パレット領域の四角形を描画
      for(let rnum = 0; rnum < 6; rnum++) {
        this.ra[rnum].display();
      }
      // スライドバーアイコンを描画
      fill(0);
      this.drawTriangle(this.pXar[1], this.pYar-this.RADIUS, this.RADIUS);
      this.drawTriangle(this.pXar[2], this.pYar-this.RADIUS, this.RADIUS);
    }
  }
  
  isClicked(rnum, msX, msY) {
    let ret = false;
    if( (0 <= rnum) && (rnum <= 5) ) {
      ret = this.ra[rnum].isClicked(msX, msY);
    }
    else {
      // index error - DO NOTHING.
    }
    return ret;
  }
  
  isPressed(sbnum, msX, msY) {
    let ret = false;
    if( (0 <= sbnum) && (sbnum <= 1) ) {  // sbnumの範囲は0~1
      if( this.visible ) {
        // スライドバーアイコンを押しているか？
        let xar = this.pXar[sbnum+1];
        if(  ((xar - this.RADIUS) < msX) && (msX < (xar + this.RADIUS))
          && ((this.pYar - this.RADIUS*2) < msY) && (msY < this.pYar) ) {
          ret = true;
        }
      }
    }
    else {
      // index error - DO NOTHING.
    }
    return ret;
  }
  
  setAreaRate(rate) {
    // 面積比を更新
    this.areaRate = rate;
    // スライドバー位置を設定
    for(let rnum = 0; rnum < 3; rnum++) {
      // 面積比の値_areaRateから_bWar[]の値を算出し設定
      // 計算誤差を少なくするため、int()ではなくround()を使う
      this.bWar[rnum] = round(this.areaRate[rnum] * this.bWframe);
      // X座標の再計算
      this.pXar[rnum+1] = this.pXar[rnum] + this.bWar[rnum];
      // 描画に反映
      this.ra[rnum+3].setBounds(this.pXar[rnum], this.pYar, this.bWar[rnum], this.pHar);
    }
    // debug
    console.log("rect3x1 rate: ", this.areaRate[0], this.areaRate[1], this.areaRate[2], "width: ", this.bWar[0], this.bWar[1], this.bWar[2]);
  }
  
  setColor(rnum, cnum) {
    let samecolor = false;
    let rnum31;
    if( (0 <= rnum) && (rnum <= 5) ) {
      rnum31 = rnum % 3;                      // rnum=3~5 を0~2 にマップする
      // 同じ色が既にセットされていないことを検査
      for(let i = 0; i < 3; i++) {
        if( i == rnum31 ) { continue; }          // 自分自身とは比較しない
        let pnum = this.ra[i].getPaletteNum();
        if( pnum == cnum ) {
          // 同じ色は設定できないフラグセット
          samecolor = true;
        }
      }
      if( ! samecolor ) {
        // 3色枠、面積比枠の両方に色値をセット
        this.ra[rnum31].setColor(cnum);
        this.ra[rnum31+3].setColor(cnum);
      }
    }
    else {
      // index error - DO NOTHING.
    }
  }
  
  setOffset(sbnum, msX, msY) {
    if( (0 <= sbnum) && (sbnum <= 1) ) {  // sbnumの範囲は0~1
      // スライドバー位置オフセット設定(x軸のみ必要)
      this.ofsX = msX - this.pXar[sbnum+1];
    }
    else {
      // index error - DO NOTHING.
    }
  }
  
  setSlideBar(sbnum, msX, msY) {
    if( (0 <= sbnum) && (sbnum <= 1) ) {  // sbnumの範囲は0~1
      // スライドバー位置を調整
      //
      //           sbnum=0    sbnum=1
      //               v          v
      //    +----------+----------+----------+
      //    | rnum=0   | rnum=1   | rnum=2   |
      //    | _bWar[0] | _bWar[1] | _bWar[2] |
      //    +----------+----------+----------+
      //  _pXar[0]   _pXar[1]   _pXar[2]   _pXar[3]
      //
      let pressX = msX - this.ofsX;
      if( (this.pXar[sbnum] < pressX) && (pressX < this.pXar[sbnum+2]) ) {
        this.pXar[sbnum+1] = pressX;
        this.bWar[sbnum] = pressX - this.pXar[sbnum];
        this.bWar[sbnum+1] = this.pXar[sbnum+2] - pressX;
        // 面積比を更新
        for(let rnum = 0; rnum < 3; rnum++) {
          this.areaRate[rnum] = float(this.bWar[rnum]) / this.bWframe;
        }
        // 描画に反映
        this.ra[sbnum+3].setBounds(this.pXar[sbnum],   this.pYar, this.bWar[sbnum],   this.pHar);
        this.ra[sbnum+4].setBounds(this.pXar[sbnum+1], this.pYar, this.bWar[sbnum+1], this.pHar);
        // debug
        console.log("rect3x1 width: ", this.bWar[0], this.bWar[1], this.bWar[2], 
                " , w.rate: ", this.areaRate[0], this.areaRate[1], this.areaRate[2]);
      }
    }
    else {
      // index error - DO NOTHING.
    }
  }
  
  setVisible(v) {
    for(let rnum = 0; rnum < 6; rnum++) {
      this.ra[rnum].setVisible(v);
    }
    // 自クラス用の可視設定
    this.visible = v;
  }
  
  getPaletteNum() {
    let pltNum = new int(6);
    for(let rnum = 0; rnum < 6; rnum++) {
      pltNum[rnum] = this.ra[rnum].getPaletteNum();
    }
    return pltNum;
  }
  
  getPaletteNum(rnum) {
    // 設定されているパレット番号を取得
    return this.ra[rnum].getPaletteNum();
  }
  
  getAreaRate() {
    // ユーザが設定した面積比を取得
    return this.areaRate;
  }
  
}

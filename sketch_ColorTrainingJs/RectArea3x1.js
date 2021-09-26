// =========================================================
//  Class Implementation
//      Rectangle Area Class (3x1)
//      @note   パレット1個分の幅、高さを設定すること
//              並べたパレットは同じ幅で表示される
// =========================================================
class RectArea3x1 {
  
  constructor(x, y, w, h, v) {
    // パレット配列
    this.ra = new RectArea(3);
    
    // パレット2連配置
    this.ra[0] = new RectArea(x,     y, w, h, v);
    this.ra[1] = new RectArea(x+w,   y, w, h, v);
    this.ra[2] = new RectArea(x+w*2, y, w, h, v);
  }
  
  display() {
    for(let rnum = 0; rnum < 3; rnum++) {
      this.ra[rnum].display();
    }
  }
  
  isClicked(rnum, msX, msY) {
    let ret = false;
    if( (0 <= rnum) && (rnum <= 2) ) {
      ret = this.ra[rnum].isClicked(msX, msY);
    }
    else {
      // index error - DO NOTHING.
    }
    return ret;
  }
  
  setColor(rnum, cnum) {
    let samecolor = false;
    if( (0 <= rnum) && (rnum <= 2) ) {
      // 同じ色が既にセットされていないことを検査
      for(let i = 0; i < 3; i++) {
        if( i == rnum ) { continue; }          // 自分自身とは比較しない
        let pnum = this.ra[i].getPaletteNum();
        if( pnum == cnum ) {
          // 同じ色は設定できないフラグセット
          samecolor = true;
        }
      }
      if( ! samecolor ) {
        this.ra[rnum].setColor(cnum);
      }
    }
    else {
      // index error - DO NOTHING.
    }
  }
  
  setVisible(v) {
    for(let rnum = 0; rnum < 3; rnum++) {
      this.ra[rnum].setVisible(v);
    }
  }
  
  getPaletteNum() {
    let pltNum = new int(3);
    for(let rnum = 0; rnum < 3; rnum++) {
      pltNum[rnum] = this.ra[rnum].getPaletteNum();
    }
    return pltNum;
  }
  
  getPaletteNum(rnum) {
    // 設定されているパレット番号を取得
    return this.ra[rnum].getPaletteNum();
  }
  
}

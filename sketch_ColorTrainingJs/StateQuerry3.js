// =========================================================
//  Class Implementation
//  Querry 3 Scene Class
// =========================================================
class StateQuerry3 extends StateBase {
  
  constructor(scaleW, scaleH) {
    super(scaleW, scaleH);
  }
  
  drawState() {
    // トレーニング画面共通描画
    super.drawState();
    
    // 各画面個別描画
    fill(0);
    textSize(16);
    
    let diff = 0;
    for(let i = 4; i < 9; i++) {
      if( params.TEXT_Q3_SUB[i] == "" ) {
        // キャプション文字列がnullのときはRectAreaも表示しない
        trainingData.ra[3+i].setVisible(false);
        trainingData.ra21[i].setVisible(false);
        trainingData.ra61ar[i].setVisible(false);
      }
      else {
        text(params.TEXT_Q3_SUB[i], 600, 180+diff);
        text("[面積]",  params.x3orig+520, 190+diff);
        text("1色",     params.x3orig,     210+diff);
        text("2色",     params.x3orig+150, 210+diff);
        text("3色",     params.x3orig+350, 210+diff);
      }
      diff += 130;
    }
    
    // Training Sheet Palette
    strokeWeight(1);
    for(let i = params.NUMBOX11_P1+params.NUMBOX11_P2; i < params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3; i++) {
      trainingData.ra[i].display();
    }
    for(let i = params.NUMBOX21_P2; i < params.NUMBOX21_P2+params.NUMBOX21_P3; i++) {
      trainingData.ra21[i].display();
    }
    for(let i = params.NUMBOX61_P2; i < params.NUMBOX61_P2+params.NUMBOX61_P3; i++) {
      trainingData.ra61ar[i].display();
    }
  }
  
  mouseClickedState(msX, msY) {
    for(let i = params.NUMBOX61_P2; i < params.NUMBOX61_P2+params.NUMBOX61_P3; i++) {
      // check rectangle(6x1) area is pressed
      for(let j = 0; j < 2; j++) {
        if( trainingData.ra61ar[i].isPressed(j, msX, msY) ) {
          trainingData.ra61ar[i].setOffset(j, msX, msY);
        }
      }
    }
  }
  
  mouseDraggedState(msX, msY) {
    for(let i = params.NUMBOX61_P2; i < params.NUMBOX61_P2+params.NUMBOX61_P3; i++) {
      // check rectangle(6x1) area is pressed
      for(let j = 0; j < 2; j++) {
        if( trainingData.ra61ar[i].isPressed(j, msX, msY) ) {
          trainingData.ra61ar[i].setSlideBar(j, msX, msY);
        }
      }
    }
  }
  
  mousePressedState(msX, msY) {
    // StateBaseの処理
    super.mousePressedState(msX, msY);
    
    // ユーザが選択したパレット番号を取得
    let pnum = cPalette.getPaletteNum();
    
    // 取得した色値をトレーニングエリアの四角形に反映
    for(let i = params.NUMBOX11_P1+params.NUMBOX11_P2; i < params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3; i++) {
      // check rectangle(1x1) area is clicked
      if( trainingData.ra[i].isClicked(msX, msY) ) {
        if( mouseButton == LEFT ) {
          // 左クリックのとき
          trainingData.ra[i].setColor(pnum);
        }
        if( mouseButton == RIGHT ) {
          // 右クリックのとき
          cPalette.setPaletteNum(trainingData.ra[i].getPaletteNum());
        }
      }
    }
    for(let i = params.NUMBOX21_P2; i < params.NUMBOX21_P2+params.NUMBOX21_P3; i++) {
      // check rectangle(2x1) area is clicked
      for(let j = 0; j < 2; j++) {
        if( trainingData.ra21[i].isClicked(j, msX, msY) ) {
          if( mouseButton == LEFT ) {
            // 左クリックのとき
            trainingData.ra21[i].setColor(j, pnum);
          }
          if( mouseButton == RIGHT ) {
            // 右クリックのとき
            cPalette.setPaletteNum(trainingData.ra21[i].getPaletteNum(j));
          }
        }
      }
    }
    for(let i = params.NUMBOX61_P2; i < params.NUMBOX61_P2+params.NUMBOX61_P3; i++) {
      // check rectangle(6x1) area is clicked
      for(let j = 0; j < 6; j++) {
        if( trainingData.ra61ar[i].isClicked(j, msX, msY) ) {
          if( mouseButton == LEFT ) {
            // 左クリックのとき
            trainingData.ra61ar[i].setColor(j, pnum);
          }
          if( mouseButton == RIGHT ) {
            // 右クリックのとき
            cPalette.setPaletteNum(trainingData.ra61ar[i].getPaletteNum(j));
          }
        }
      }
    }
  }
  
}

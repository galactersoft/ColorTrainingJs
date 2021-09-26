// =========================================================
//  Class Implementation
//  Querry 1 Scene Class
// =========================================================
class StateQuerry1 extends StateBase {
  
  constructor(scaleW, scaleH) {
    super(scaleW, scaleH);
  }
  
  drawState() {
    // トレーニング画面共通描画
    super.drawState();
    
    // 各画面個別描画
    fill(0);
    textSize(20);
    text("1. あなたが最も好きな色を3つ選んでください。", 600, 180);
    text("2. 以下の言葉から連想する色を3色選んでください。", 600, 315);
    textSize(16);
    
    let diff = 0;
    for(let i = 0; i < 4; i++) {
      if( params.TEXT_Q2_SUB[i*2] == "" ) {
        // キャプション文字列がnullのときはRectAreaも表示しない
        trainingData.ra31[i*2].setVisible(false);
      }
      else {
        text(params.TEXT_Q2_SUB[i*2],   params.x2orig,     355+diff);
      }
      if( params.TEXT_Q2_SUB[i*2+1] == "" ) {
        // キャプション文字列がnullのときはRectAreaも表示しない
        trainingData.ra31[i*2+1].setVisible(false);
      }
      else {
        text(params.TEXT_Q2_SUB[i*2+1], params.x2orig+250, 355+diff);
      }
      diff += 110;
    }
    
    // Training Sheet Palette
    strokeWeight(1);
    for(let i = 0; i < params.NUMBOX11_P1; i++) {
      trainingData.ra[i].display();
    }
    for(let i = 0; i < params.NUMBOX31_P1; i++) {
      trainingData.ra31[i].display();
    }
  }
  
  mousePressedState(msX, msY) {
    // StateBaseの処理
    super.mousePressedState(msX, msY);
    
    // ユーザが選択したパレット番号を取得
    let pnum = cPalette.getPaletteNum();
    
    // 取得した色値をトレーニングエリアの四角形に反映
    for(let i = 0; i < params.NUMBOX11_P1; i++) {
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
    for(let i = 0; i < params.NUMBOX31_P1; i++) {
      // check rectangle(3x1) area is clicked
      for(let j = 0; j < 3; j++) {
        if( trainingData.ra31[i].isClicked(j, msX, msY) ) {
          if( mouseButton == LEFT ) {
            // 左クリックのとき
            trainingData.ra31[i].setColor(j, pnum);
          }
          if( mouseButton == RIGHT ) {
            // 右クリックのとき
            cPalette.setPaletteNum(trainingData.ra31[i].getPaletteNum(j));
          }
        }
      }
    }
  }
  
}

// =========================================================
//  Class Implementation
//  Querry 4 Scene Class
// =========================================================
class StateQuerry4 extends StateBase {
  
  constructor(scaleW, scaleH) {
    super(scaleW, scaleH);
  }
  
  drawState() {
    // トレーニング画面共通描画
    super.drawState();
    
    // 各画面個別描画
    fill(0);
    textSize(20);
    text("4. あなたは、あなたが住んでいる国の人々に昔から最も親しまれてきた色はどの", 600, 180);
    text("   色だと思いますか？", 600, 200);
    text("5. あなたが思う、あなたの出身地（都道府県）から連想する色はどの色ですか？", 600, 340);
    textSize(16);
    text("出身地（都道府県）：", 850, 420);
    trainingData.inpUserInfo[3].show();
    
    // Training Sheet Palette
    strokeWeight(1);
    for(let i = params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3; i < params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3+params.NUMBOX11_P4; i++) {
      trainingData.ra[i].display();
    }
  }
  
  mousePressedState(msX, msY) {
    // StateBaseの処理
    super.mousePressedState(msX, msY);
    
    // ユーザが選択したパレット番号を取得
    let pnum = cPalette.getPaletteNum();
    
    // 取得した色値をトレーニングエリアの四角形に反映
    for(let i = params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3; i < params.NUMBOX11_P1+params.NUMBOX11_P2+params.NUMBOX11_P3+params.NUMBOX11_P4; i++) {
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
  }
  
}

// =========================================================
//  Class Implementation
//  Training Scene Base Class
// =========================================================
class StateBase {
  
  constructor(scaleW, scaleH) {
    this.scaleW = scaleW;
    this.scaleH = scaleH;
  }
  
  init() {
    // Base Class 用初期化処理
  }
  
  drawState() {
    // トレーニング画面共通描画

    // タイトル下の説明文
    let str = nf(params.NUM_OF_COLORCHIP, 0);
    textSize(20);
    text("左側にある " + str + " 色のカラーパレットから、各問にあう色を選んでください。", 600, 90);
    textSize(16);
    if( params.MODEL_COURSEWORK ) {
      text("学籍番号:", 850, 125);
      trainingData.inpUserInfo[0].show();
      text("氏名:",  1120, 125);
      trainingData.inpUserInfo[1].show();
    }
    if( params.MODEL_RESEARCH ) {
      text("年齢:",  890, 125);
      trainingData.selUserInfo[0].show();
      text("性別:", 1080, 125);
      trainingData.selUserInfo[1].show();
      text("国籍:", 1220, 125);
      trainingData.inpUserInfo[2].show();
    }

    // セパレートライン
    strokeWeight(6);
    stroke(220, 220, 220);
    line(540, 80, 540, 800);

    // ナビゲーション用
    pageNavi.display();
    
    // Display Pick Up Color Palette
    strokeWeight(1);  // Color Paletteは黒い線を入れて色同士干渉しないようにしたい
    cPalette.display();
  }
  
  mouseClickedState(msX, msY) {
    // Base Classの処理
  }
  
  mouseDraggedState(msX, msY) {
    // Base Classの処理
  }
  
  mousePressedState(msX, msY) {
    if( mouseButton == LEFT ) {
      // 左ボタンが押されたら、カラーパレットから色値を取得し、確認エリアに設定
      cPalette.mousePressedLeft(msX, msY);
    }
    if( mouseButton == RIGHT ) {
      // 右ボタンが押されたら、クリック場所の色番号を取得、アドバイズ表示
      // ファイル読み込みモードでのみ有効化
      if( params.LOAD_FILE != "" ) {
        cPalette.mousePressedRight(msX, msY);
      }
    }
    // ★SaveボタンとExitボタン操作の処理はここが良いか？★
  }
  
  decidePrevScene() {
    let ret = false;
    if( pageNavi.valueBtnPrev == params.BUTTON_ON ) {
      pageNavi.valueBtnPrev = params.BUTTON_OFF;
      ret = true;
    }
    return ret;
  }
  
  decideNextScene() {
    let ret = false;
    if( pageNavi.valueBtnNext == params.BUTTON_ON ) {
      pageNavi.valueBtnNext = params.BUTTON_OFF;
      ret = true;
    }
    return ret;
  }
  
  hideGuiObject() {
    pageNavi.hideGuiButton();
    trainingData.inpUserInfo[0].hide();
    trainingData.inpUserInfo[1].hide();
    trainingData.inpUserInfo[2].hide();
    trainingData.inpUserInfo[3].hide();
    trainingData.selUserInfo[0].hide();
    trainingData.selUserInfo[1].hide();
  }
  
}

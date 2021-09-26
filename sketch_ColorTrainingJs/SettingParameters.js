// =========================================================
//  Class Implementation
//   外部設定パラメータ
//    初期設定用ファイル（JSONファイル）からの読み込み
// =========================================================
class SettingParameters {
  
  constructor() {
    // Const カラーセル矩形領域定義用
    this.BOX_W = 50;
    this.BOX_H = 50;
    this.BOX31_W = this.BOX_W * 3;
    this.BOX31_H = this.BOX_H;
    this.BOX31_W1 = this.BOX_W;
    this.BOX31_W2 = this.BOX_W * 2;
    this.NUMBOX11_P1 = 3;
    this.NUMBOX11_P2 = 4;
    this.NUMBOX11_P3 = 5;
    this.NUMBOX11_P4 = 2;
    this.NUMBOX21_P2 = 4;
    this.NUMBOX21_P3 = 5;
    this.NUMBOX31_P1 = 8;
    this.NUMBOX61_P2 = 4;
    this.NUMBOX61_P3 = 5;
    
    // Const カラーセル矩形領域の座標定義用
    this.x1orig = 650;
    this.y1orig = 200;
    this.x2orig = 650;
    this.y2orig = 360;
    this.x3orig = 650;
    this.y3orig = 275;
    this.x4orig = 700;
    this.y4orig = 225;
    
    // Const テキストフィールド領域の座標定義用
    this.xforig = 650;
    this.yforig = 110;
    
    // Const ボタン押下状態
    this.BUTTON_OFF = 1;
    this.BUTTON_ON  = 2;
    
    // JSON Object
    this.jobjBase = jobjBase;
    
    // カラーパレットの色数
    this.NUM_OF_COLORCHIP = 0;
    this.SIZE_N45PALETTE = false;
    
    // リリース版（利用目的）識別子
    this.MODEL_ID = 0;
    this.MODEL_COURSEWORK = false;
    this.MODEL_RESEARCH = false;
    
    // カラーチップの表色系データファイル名
    this.COLCHIP_FILE = "";
    
    // トレーニング結果ファイル名
    this.LOAD_FILE = "";
    
    // 表示用テキスト
    this.TEXT_TITLE = "";
    this.TEXT_Q2_SUB = new Array(8);
    this.TEXT_Q3_SUB = new Array(9);
  }
  
  loadSettings() {
    // アプリ設定オブジェクト
    let jobjAppSettings = this.jobjBase.settings;
    
    // カラーパレットの色数／45色パレット設定
    this.NUM_OF_COLORCHIP = jobjAppSettings.palette;
    if( this.NUM_OF_COLORCHIP >= 50 ) {
      this.SIZE_N45PALETTE = false;
    }
    else {
      this.SIZE_N45PALETTE = true;
    }
    
    // リリース版（利用目的）識別子   1: 講義使用版  2: 研究調査版
    this.MODEL_ID = jobjAppSettings.purpose;
    if( this.MODEL_ID == 1) {
      this.MODEL_COURSEWORK = true;
      this.MODEL_RESEARCH = false;
    }
    else if( this.MODEL_ID == 2) {
      this.MODEL_COURSEWORK = false;
      this.MODEL_RESEARCH = true;
    }
    
    // カラーチップの表色系データファイル名
    this.COLCHIP_FILE = jobjAppSettings.datafile;
    // トレーニング結果ファイル名
    //   トレーニング結果ファイルを読み込む場合、ファイル名を指定して実行する．
    //   通常トレーニング実行時はファイル名を記入しないこと．
    this.LOAD_FILE = jobjAppSettings.resultfile;
    
    // 表示用テキスト設定オブジェクト
    let jobjTextMessage = jobjBase.messages;
    // タイトル
    this.TEXT_TITLE = jobjTextMessage.title;
    if( this.MODEL_RESEARCH ) {
      // 追加の文言を入れる場合はここに
      //this.TEXT_TITLE = this.TEXT_TITLE + "　研究調査版";
    }
    
    // Q.2
    let len;
    let jarrayMsgQ2 = jobjTextMessage.Q2;
    len = Object.keys(jarrayMsgQ2).length;
    for(let i = 0; i < len; i++) {
      this.TEXT_Q2_SUB[i] = jarrayMsgQ2[i];
    }
    // Q.3
    let jarrayMsgQ3 = jobjTextMessage.Q3;
    len = Object.keys(jarrayMsgQ3).length;
    for(let i = 0; i < len; i++) {
      this.TEXT_Q3_SUB[i] = jarrayMsgQ3[i];
    }
    
    /*
    // debug
    console.log(this.NUM_OF_COLORCHIP);
    console.log(this.SIZE_N45PALETTE);
    console.log(this.MODEL_ID);
    console.log(this.MODEL_COURSEWORK);
    console.log(this.MODEL_RESEARCH);
    console.log(this.COLCHIP_FILE);
    console.log(this.LOAD_FILE);
    console.log(this.TEXT_TITLE);
    console.log(this.TEXT_Q2_SUB[0]);
    console.log(this.TEXT_Q2_SUB[1]);
    console.log(this.TEXT_Q2_SUB[2]);
    console.log(this.TEXT_Q2_SUB[3]);
    console.log(this.TEXT_Q2_SUB[4]);
    console.log(this.TEXT_Q2_SUB[5]);
    console.log(this.TEXT_Q2_SUB[6]);
    console.log(this.TEXT_Q2_SUB[7]);
    console.log(this.TEXT_Q3_SUB[0]);
    console.log(this.TEXT_Q3_SUB[1]);
    console.log(this.TEXT_Q3_SUB[2]);
    console.log(this.TEXT_Q3_SUB[3]);
    console.log(this.TEXT_Q3_SUB[4]);
    console.log(this.TEXT_Q3_SUB[5]);
    console.log(this.TEXT_Q3_SUB[6]);
    console.log(this.TEXT_Q3_SUB[7]);
    console.log(this.TEXT_Q3_SUB[8]);
    */
  }
  
}

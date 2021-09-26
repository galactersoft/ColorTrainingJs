// =========================================================
//  Class Implementation
//  Disclaimer Scene Class
// =========================================================
class StateDisclaimer {
  
  constructor(scaleW, scaleH) {
    this.scaleW = scaleW;
    this.scaleH = scaleH;
  }
  
  init() {
    // Class 用初期化処理
  }
  
  drawState() {
    // 同意文書
    fill(0);
    textSize(20);
    let x = 80;
    let y = 120;
    let lh = 25;
    text("　この配色トレーニングは、個人の色の使い方の確認と、東京都立産業技術大学院大学修了生コミュニティにおける「デジタルアプリケーショ", x, y);
    text("ンを活用した色彩教育システムの開発と感情色彩に関する研究」の調査への活用を目的としています。研究に調査結果を活用する場合は、ご", x, y+lh);
    text("回答いただいた個人情報は含まず選んでいただいた色彩データを全て統計的に処理しますので、皆様にご迷惑をおかけすることはございませ", x, y+lh*2);
    text("ん。ご協力いただける方は、以下の項目に同意していただけるよう何卒ご協力を賜りますようお願い申し上げます。", x, y+lh*3);
    
    y = 360;
    text("【個人情報の取り扱いについて】", x, y);
    text("　この配色トレーニングは、東京都立産業技術大学院大学研究安全倫理委員会の承認の上で実施します。取得した一切のデータは、「デジタ", x, y+lh);
    text("ルアプリケーションを活用した色彩教育システムの開発と感情色彩に関する研究」のみ使用します。また本アンケートに関わる一切のデータは", x, y+lh*2);
    text("匿名化した上でGoogleドライブに保管されます。取得したアンケートデータは、Googleドライブに研究が終了するまで保存され、研究終了後", x, y+lh*3);
    text("はたたちに削除します。また、本アンケートへの協力に同意しなくても何ら不利益を受けることはありません。回答は本人の自由意思に基づ", x, y+lh*4);
    text("くものであり、不利益を受けず随時撤回することができます。", x, y+lh*5);
    
    text("【ご回答方法】", x, y+lh*7);
    text("●画面左上のカラーパレットから、左の側の質問項目に合う色を選択してください。", x, y+lh*8);
    text("●カラーパレットで選んだ色は、カラーパレットの下の「選択された色」に表示されます。確認後、質問項目の□枠をクリックすると選択され", x, y+lh*9);
    text("　た色が反映されます。", x, y+lh*10);
    text("●色面積の質問項目については、□枠上部の▼をスライドさせて、質問項目に合う色面積比にしてください。", x, y+lh*11);
    
    text("【本アンケートに関するお問い合わせ先】", x, y+lh*13);
    text("東京都立産業技術大学院大学　河西大介（kasai-daisuke@aiit.ac.jp）", x, y+lh*14);
    
    trainingData.btnAgree[0].show();
    trainingData.btnAgree[1].show();
  }
  
  decideNextScene() {
    let ret = false;
    if( (trainingData.btnAgree[0].value() == params.BUTTON_ON) || (trainingData.btnAgree[1].value() == params.BUTTON_ON) ) {
      ret = true;
    }
    return ret;
  }
  
  hideGuiObject() {
    trainingData.btnAgree[0].hide();
    trainingData.btnAgree[1].hide();
    trainingData.valueBtnAgree = params.BUTTON_OFF;     // ボタン値クリア
    trainingData.valueBtnDisagree = params.BUTTON_OFF;  //
  }
  
}

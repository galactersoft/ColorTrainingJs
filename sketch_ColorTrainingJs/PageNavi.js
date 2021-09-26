// =========================================================
//  Class Implementation
//      Page Navigation Class
// =========================================================
class PageNavi {
  
  constructor(scaleW, scaleH) {
    this.scaleW = scaleW;
    this.scaleH = scaleH;
    
    // ページナビゲートボタン
    this.btnPageNavi = new Array(4);
    
    // Prevボタン
    this.btnPageNavi[0] = createButton("< Prev", params.BUTTON_OFF);
    this.btnPageNavi[0].position(120, 840);
    this.btnPageNavi[0].mousePressed(this.buttonPressed);
    this.btnPageNavi[0].hide();
    // Nextボタン
    this.btnPageNavi[1] = createButton("Next >", params.BUTTON_OFF);
    this.btnPageNavi[1].position(200, 840);
    this.btnPageNavi[1].mousePressed(this.buttonPressed);
    this.btnPageNavi[1].hide();
    // Saveボタン
    this.btnPageNavi[2] = createButton("Save Result", params.BUTTON_OFF);
    this.btnPageNavi[2].position(320, 840);
    this.btnPageNavi[2].mousePressed(this.saveResult);
    this.btnPageNavi[2].hide();
    // Exitボタン
    this.btnPageNavi[3] = createButton("Exit", params.BUTTON_OFF);
    this.btnPageNavi[3].position(440, 840);
    this.btnPageNavi[3].mousePressed(this.exitTraining);
    this.btnPageNavi[3].hide();
  }
  
  display() {
    // ナビゲーション用
    strokeWeight(1);
    stroke(0, 0, 0);
    text("Page:", 60,  855);
    this.btnPageNavi[0].show();
    this.btnPageNavi[1].show();
    this.btnPageNavi[2].show();
    this.btnPageNavi[3].show();
  }
  
  buttonPressed() {
    console.log("PageNavi: btnPressed", this.value());
    // ボタン押下を記録
    this.value(params.BUTTON_ON);  // ここでのthisはマウス操作したボタンオブジェクトを指している
    console.log(this.value());
  }
  
  saveResult() {
    console.log("PageNavi: Save Pressed");
    let ret = window.confirm("Save Training Results.\nトレーニング結果を保存します。");
    if( ret ) {
      trainingData.saveCSV();
    }
    else {
      // Do Nothing.
    }
  }
  
  exitTraining() {
    console.log("PageNavi: Exit Pressed");
    if( trainingData.isSaved ) {
      // トレーニング結果保存済みのとき
      alert("Close & Exit Browser.\nブラウザを閉じて終了してくだい。");
      //window.confirm("Close & Exit Browser.\nブラウザを閉じて終了してくだい。");
    }
    else {
      // 未保存のとき
      alert("Training Result is NOT Saved.  Click OK to Continue.\nトレーニング結果が保存されていません。OKボタンを押して継続してください。");
      //window.confirm("Training Result is NOT Saved.  Click OK to Continue.\nトレーニング結果が保存されていません。OKボタンを押して継続してください。");
    }
  }
  
  hideGuiButton() {
    this.btnPageNavi[0].hide();
    this.btnPageNavi[1].hide();
    this.btnPageNavi[2].hide();
    this.btnPageNavi[3].hide();
  }
  
  get valueBtnPrev() {
    return this.btnPageNavi[0].value();
  }
  
  get valueBtnNext() {
    return this.btnPageNavi[1].value();
  }
  
  get valueBtnSave() {
    return this.btnPageNavi[2].value();
  }
  
  get valueBtnExit() {
    return this.btnPageNavi[3].value();
  }
  
  set valueBtnPrev(val) {
    this.btnPageNavi[0].value(val);
  }
  
  set valueBtnNext(val) {
    this.btnPageNavi[1].value(val);
  }
  
}

// =========================================================
//  Class Implementation
//      Save Training Result & GUI Control Class
// =========================================================
class TrainingData {
  
  constructor() {
    // トレーニング結果保存済みフラグ
    this.isSaved = false;
    
    // 同意・不同意フラグ
    //this.isAgreed = false;
    //this.isDisagreed = false;
    
    // 同意・不同意ボタン
    this.btnAgree = new Array(2);
    // for StateDisclaimer
    // 同意ボタン
    this.btnAgree[0] = createButton("同意する", params.BUTTON_OFF);
    this.btnAgree[0].position(580, 280);
    this.btnAgree[0].mousePressed(this.btnPressedAgree);
    this.btnAgree[0].hide();
    // 不同意ボタン
    this.btnAgree[1] = createButton("同意しない", params.BUTTON_OFF);
    this.btnAgree[1].position(740, 280);
    this.btnAgree[1].mousePressed(this.btnPressedDisagree);
    this.btnAgree[1].hide();
    
    // Text Field
    this.inpUserInfo = new Array(4);
    // 学籍番号
    this.inpUserInfo[0] = createInput("");
    this.inpUserInfo[0].position(params.xforig+330, params.yforig);
    this.inpUserInfo[0].input(this.inpEventId);
    this.inpUserInfo[0].hide();
    // 氏名
    this.inpUserInfo[1] = createInput("");
    this.inpUserInfo[1].position(params.xforig+520, params.yforig);
    this.inpUserInfo[1].input(this.inpEventName);
    this.inpUserInfo[1].hide();
    // 国籍
    this.inpUserInfo[2] = createInput("");
    this.inpUserInfo[2].position(params.xforig+620, params.yforig);
    this.inpUserInfo[2].size(120);  // Wのみ指定、Hは省略
    this.inpUserInfo[2].input(this.inpEventNation);
    this.inpUserInfo[2].hide();
    // 出身地
    this.inpUserInfo[3] = createInput("");
    this.inpUserInfo[3].position(1020, 405);
    this.inpUserInfo[3].input(this.inpEventHometown);
    this.inpUserInfo[3].hide();
    
    // Select Box
    this.selUserInfo = new Array(2);
    // 年齢
    this.selUserInfo[0] = createSelect();
    this.selUserInfo[0].position(params.xforig+290, params.yforig);
    this.selUserInfo[0].option("-");
    this.selUserInfo[0].option("10才未満");
    this.selUserInfo[0].option("10-14才");
    this.selUserInfo[0].option("15-19才");
    this.selUserInfo[0].option("20-24才");
    this.selUserInfo[0].option("25-29才");
    this.selUserInfo[0].option("30-34才");
    this.selUserInfo[0].option("35-39才");
    this.selUserInfo[0].option("40-44才");
    this.selUserInfo[0].option("45-49才");
    this.selUserInfo[0].option("50-54才");
    this.selUserInfo[0].option("55-59才");
    this.selUserInfo[0].option("60-64才");
    this.selUserInfo[0].option("65-69才");
    this.selUserInfo[0].option("70-74才");
    this.selUserInfo[0].option("75-79才");
    this.selUserInfo[0].option("80才以上");
    this.selUserInfo[0].changed(this.selEventAge);
    this.selUserInfo[0].hide();
    // 性別
    this.selUserInfo[1] = createSelect();
    this.selUserInfo[1].position(params.xforig+480, params.yforig);
    this.selUserInfo[1].option("-");
    this.selUserInfo[1].option("男");
    this.selUserInfo[1].option("女");
    this.selUserInfo[1].changed(this.selEventGender);
    this.selUserInfo[1].hide();
    
    // create RectArea
    this.ra   = new RectArea(14);
    this.ra21 = new RectArea2x1(9);
    this.ra31 = new RectArea3x1(8);
    this.ra61ar = new RectArea6x1AR(9);
    
    // for StateQuerry1
    // Q.1
    this.ra[0] = new RectArea(params.x1orig,     params.y1orig, params.BOX_W, params.BOX_H, true);
    this.ra[1] = new RectArea(params.x1orig+90,  params.y1orig, params.BOX_W, params.BOX_H, true);
    this.ra[2] = new RectArea(params.x1orig+180, params.y1orig, params.BOX_W, params.BOX_H, true);
    // Q.2
    this.ra31[0] = new RectArea3x1(params.x2orig,     params.y2orig,     params.BOX_W, params.BOX_H, true);
    this.ra31[1] = new RectArea3x1(params.x2orig+250, params.y2orig,     params.BOX_W, params.BOX_H, true);
    this.ra31[2] = new RectArea3x1(params.x2orig,     params.y2orig+110, params.BOX_W, params.BOX_H, true);
    this.ra31[3] = new RectArea3x1(params.x2orig+250, params.y2orig+110, params.BOX_W, params.BOX_H, true);
    this.ra31[4] = new RectArea3x1(params.x2orig,     params.y2orig+220, params.BOX_W, params.BOX_H, true);
    this.ra31[5] = new RectArea3x1(params.x2orig+250, params.y2orig+220, params.BOX_W, params.BOX_H, true);
    this.ra31[6] = new RectArea3x1(params.x2orig,     params.y2orig+330, params.BOX_W, params.BOX_H, true);
    this.ra31[7] = new RectArea3x1(params.x2orig+250, params.y2orig+330, params.BOX_W, params.BOX_H, true);
    
    // for StateQuerry2
    // Q3
    this.ra[3]     = new RectArea(     params.x3orig,     params.y3orig,     params.BOX_W, params.BOX_H, true);
    this.ra21[0]   = new RectArea2x1(  params.x3orig+150, params.y3orig,     params.BOX_W, params.BOX_H, true);
    this.ra61ar[0] = new RectArea6x1AR(params.x3orig+350, params.y3orig,     params.BOX_W, params.BOX_H, true);
    this.ra[4]     = new RectArea(     params.x3orig,     params.y3orig+130, params.BOX_W, params.BOX_H, true);
    this.ra21[1]   = new RectArea2x1(  params.x3orig+150, params.y3orig+130, params.BOX_W, params.BOX_H, true);
    this.ra61ar[1] = new RectArea6x1AR(params.x3orig+350, params.y3orig+130, params.BOX_W, params.BOX_H, true);
    this.ra[5]     = new RectArea(     params.x3orig,     params.y3orig+260, params.BOX_W, params.BOX_H, true);
    this.ra21[2]   = new RectArea2x1(  params.x3orig+150, params.y3orig+260, params.BOX_W, params.BOX_H, true);
    this.ra61ar[2] = new RectArea6x1AR(params.x3orig+350, params.y3orig+260, params.BOX_W, params.BOX_H, true);
    this.ra[6]     = new RectArea(     params.x3orig,     params.y3orig+390, params.BOX_W, params.BOX_H, true);
    this.ra21[3]   = new RectArea2x1(  params.x3orig+150, params.y3orig+390, params.BOX_W, params.BOX_H, true);
    this.ra61ar[3] = new RectArea6x1AR(params.x3orig+350, params.y3orig+390, params.BOX_W, params.BOX_H, true);
    
    // for StateQuerry3
    // Q3
    this.ra[7]     = new RectArea(     params.x3orig,     params.y3orig-50,  params.BOX_W, params.BOX_H, true);
    this.ra21[4]   = new RectArea2x1(  params.x3orig+150, params.y3orig-50,  params.BOX_W, params.BOX_H, true);
    this.ra61ar[4] = new RectArea6x1AR(params.x3orig+350, params.y3orig-50,  params.BOX_W, params.BOX_H, true);
    this.ra[8]     = new RectArea(     params.x3orig,     params.y3orig+80,  params.BOX_W, params.BOX_H, true);
    this.ra21[5]   = new RectArea2x1(  params.x3orig+150, params.y3orig+80,  params.BOX_W, params.BOX_H, true);
    this.ra61ar[5] = new RectArea6x1AR(params.x3orig+350, params.y3orig+80,  params.BOX_W, params.BOX_H, true);
    this.ra[9]     = new RectArea(     params.x3orig,     params.y3orig+210, params.BOX_W, params.BOX_H, true);
    this.ra21[6]   = new RectArea2x1(  params.x3orig+150, params.y3orig+210, params.BOX_W, params.BOX_H, true);
    this.ra61ar[6] = new RectArea6x1AR(params.x3orig+350, params.y3orig+210, params.BOX_W, params.BOX_H, true);
    this.ra[10]    = new RectArea(     params.x3orig,     params.y3orig+340, params.BOX_W, params.BOX_H, true);
    this.ra21[7]   = new RectArea2x1(  params.x3orig+150, params.y3orig+340, params.BOX_W, params.BOX_H, true);
    this.ra61ar[7] = new RectArea6x1AR(params.x3orig+350, params.y3orig+340, params.BOX_W, params.BOX_H, true);
    this.ra[11]    = new RectArea(     params.x3orig,     params.y3orig+470, params.BOX_W, params.BOX_H, true);
    this.ra21[8]   = new RectArea2x1(  params.x3orig+150, params.y3orig+470, params.BOX_W, params.BOX_H, true);
    this.ra61ar[8] = new RectArea6x1AR(params.x3orig+350, params.y3orig+470, params.BOX_W, params.BOX_H, true);
    
    // for StateQuerry4
    // Q.4
    this.ra[12] = new RectArea(params.x4orig, params.y4orig,     params.BOX_W, params.BOX_H, true);
    // Q.5
    this.ra[13] = new RectArea(params.x4orig, params.y4orig+160, params.BOX_W, params.BOX_H, true);
    
    // Training Result Table    // T.B.D. ★ JSON化したいがひとまずCSVで実装
    this.result = new p5.Table();
    
    this.result.addColumn("id");
    this.result.addColumn("name");
    this.result.addColumn("age");
    this.result.addColumn("gender");
    this.result.addColumn("nationality");
    this.result.addColumn("agreement");
    this.result.addColumn("pltnum");
    this.result.addColumn("Qno");
    this.result.addColumn("Qsub");
    this.result.addColumn("kwd");
    this.result.addColumn("kwd2");
    this.result.addColumn("col_1");
    this.result.addColumn("col_2a");
    this.result.addColumn("col_2b");
    this.result.addColumn("col_3a");
    this.result.addColumn("col_3b");
    this.result.addColumn("col_3c");
    this.result.addColumn("col_Aa");
    this.result.addColumn("col_Ab");
    this.result.addColumn("col_Ac");
    this.result.addColumn("col_Ra");
    this.result.addColumn("col_Rb");
    this.result.addColumn("col_Rc");
  }
  
//  get isSaved() {
//    return this.isSaved;
//  }
  
//  set isSaved(val) {
//    this.isSaved = val;
//  }
  
  btnPressedAgree() {
    console.log("tr_data: btnPressed Agree", this.value());
    // ボタン押下を記録
    this.value(params.BUTTON_ON);  // ここでのthisはマウス操作したボタンオブジェクトを指している
    console.log(this.value());
  }
  
  btnPressedDisagree() {
    console.log("tr_data: btnPressed DisAgree", this.value());
    // ボタン押下を記録
    this.value(params.BUTTON_ON);  // ここでのthisはマウス操作したボタンオブジェクトを指している
    console.log(this.value());
  }
  
  get valueBtnAgree() {
    return this.btnAgree[0].value();
  }
  
  get valueBtnDisagree() {
    return this.btnAgree[1].value();
  }
  
  set valueBtnAgree(val) {
    this.btnAgree[0].value(val);
  }
  
  set valueBtnDisagree(val) {
    this.btnAgree[1].value(val);
  }
  
  inpEventId() {
    console.log("tr_data: input Id", this.value());
  }
  
  inpEventName() {
    console.log("tr_data: input Name", this.value());
  }
  
  inpEventNation() {
    console.log("tr_data: input Nation", this.value());
  }
  
  inpEventHometown() {
    console.log("tr_data: input Hometown", this.value());
  }
  
  selEventAge() {
    console.log("tr_data: select Age", this.value());
  }
  
  selEventGender() {
    console.log("tr_data: select Gender", this.value());
  }
  
  saveCSV() {
    // T.B.D. ★ JSON化したいがひとまずCSVで実装
    for(let idx = 0; idx < 9+9+2; idx++) {
      let newRow = this.result.addRow();
      
      if( params.MODEL_COURSEWORK ) {
        newRow.setString("id",   this.inpUserInfo[0].value());
        newRow.setString("name", this.inpUserInfo[1].value());
      }
      if( params.MODEL_RESEARCH ) {
        newRow.set("age",    this.selUserInfo[0].value());
        newRow.set("gender", this.selUserInfo[1].value());
        newRow.setString("nationality", this.inpUserInfo[2].value());
      }
      
      if( this.btnAgree[0].value() == params.BUTTON_ON ) {
        newRow.set("agreement", true);
      }
      if( this.btnAgree[1].value() == params.BUTTON_ON ) {
        newRow.set("agreement", false);
      }
      
      if( params.SIZE_N45PALETTE ) {
        newRow.setString("pltnum", "n45");
      }
      else {
        newRow.setString("pltnum", "num");
      }
      
      if( idx == 0 ) {
        // Q.1
        newRow.set("Qno", 1);
        newRow.set("Qsub", 1);
        newRow.setString("kwd", "favorite");
        newRow.set("col_3a", this.ra[0].getPaletteNum());
        newRow.set("col_3b", this.ra[1].getPaletteNum());
        newRow.set("col_3c", this.ra[2].getPaletteNum());
      }
      else if((idx >= 1) && (idx < 9)) {
        // Q.2
        let qsub = idx - 1;
        //String[] kwd = {"morning", "midday", "sunset", "night", 
        //                "spring", "summer", "autumn", "winter"};
        let kwd = new Array( params.TEXT_Q2_SUB[0], params.TEXT_Q2_SUB[1], params.TEXT_Q2_SUB[2], params.TEXT_Q2_SUB[3], 
                             params.TEXT_Q2_SUB[4], params.TEXT_Q2_SUB[5], params.TEXT_Q2_SUB[6], params.TEXT_Q2_SUB[7] );
        let palt = new Array(3);
        for( let i=0; i<3; i++ ) {
          palt[i] = this.ra31[qsub].getPaletteNum(i);
        }
        newRow.set("Qno", 2);
        newRow.set("Qsub", qsub+1);
        newRow.setString("kwd", kwd[qsub]);
        newRow.set("col_3a", palt[0]);
        newRow.set("col_3b", palt[1]);
        newRow.set("col_3c", palt[2]);
      }
      else if((idx >= 9) && (idx < 18)) {
        // Q.3
        let qsub = idx - 9;
        //String[] kwd = {"AI", "RAKU", "KA", "SO", 
        //                "SHU", "KAKU", "YU", "HIN", "RI"};
        let kwd = new Array( params.TEXT_Q3_SUB[0], params.TEXT_Q3_SUB[1], params.TEXT_Q3_SUB[2], params.TEXT_Q3_SUB[3], 
                             params.TEXT_Q3_SUB[4], params.TEXT_Q3_SUB[5], params.TEXT_Q3_SUB[6], params.TEXT_Q3_SUB[7], 
                             params.TEXT_Q3_SUB[8] );
        let palt2 = new Array(2);
        let palt3 = new Array(6);
        let rate  = new Array(3);
//        palt2 = this.ra21[qsub].getPaletteNum();
        for( let i=0; i<2; i++ ) {
          palt2[i] = this.ra21[qsub].getPaletteNum(i);
        }
//        palt3 = this.ra61ar[qsub].getPaletteNum();
        for( let i=0; i<6; i++ ) {
          palt3[i] = this.ra61ar[qsub].getPaletteNum(i);
        }
        rate  = this.ra61ar[qsub].getAreaRate();
        newRow.set("Qno", 3);
        newRow.set("Qsub", qsub+1);
        newRow.setString("kwd", kwd[qsub]);
        newRow.set("col_1",  this.ra[qsub+3].getPaletteNum());
        newRow.set("col_2a", palt2[0]);
        newRow.set("col_2b", palt2[1]);
        newRow.set("col_3a", palt3[0]);
        newRow.set("col_3b", palt3[1]);
        newRow.set("col_3c", palt3[2]);
        newRow.set("col_Aa", palt3[3]);
        newRow.set("col_Ab", palt3[4]);
        newRow.set("col_Ac", palt3[5]);
        newRow.setNum("col_Ra", rate[0]);
        newRow.setNum("col_Rb", rate[1]);
        newRow.setNum("col_Rc", rate[2]);
      }
      else if( idx == 18 ) {
        // Q.4
        newRow.set("Qno", 4);
        newRow.set("Qsub", 1);
        newRow.setString("kwd", "nation");
        newRow.set("col_1", this.ra[12].getPaletteNum());
      }
      else if( idx == 19) {
        // Q.5
        newRow.set("Qno", 5);
        newRow.set("Qsub", 1);
        newRow.setString("kwd", "hometown");
        newRow.setString("kwd2", this.inpUserInfo[3].value());
        newRow.set("col_1", this.ra[13].getPaletteNum());
      }
      else {
        // DO NOTHING.
      }
    }
    
    // ファイル保存
    let fname = "./result/ColorTraining_" + str(params.MODEL_ID) + "_";
    if( params.MODEL_COURSEWORK ) {
      // "id" + "name"
      fname = fname + this.inpUserInfo[0].value() + "_" + this.inpUserInfo[1].value() + ".csv";
    }
    else if( params.MODEL_RESEARCH ) {
      // "age" + "gender" + "nationality" + "YYYYMMDDHHMISS"
      let ymdhms = nf(year()) + nf(month(),2) + nf(day(),2) + nf(hour(),2) + nf(minute(),2) + nf(second(),2);
      fname = fname + this.selUserInfo[0].value() + "_" + this.selUserInfo[1].value() + "_" + 
              this.inpUserInfo[2].value() + "-" + ymdhms + ".csv";
    }
    console.log(fname, this.result);
    saveTable(this.result, fname);
    this.isSaved = true;
    console.log("Training Data Saved.");
  }
  
}

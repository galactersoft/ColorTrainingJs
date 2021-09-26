// =========================================================
//  Variable
// =========================================================
// 画面遷移
let stateDisclaimer;
let stateQuerry1;
let stateQuerry2;
let stateQuerry3;
let stateQuerry4;

// 画面遷移(Scene Manager)
let smgr;

// 初期設定パラメータ
let jobjBase;
let params;

// カラーパレット
let colorTable;
let cPalette;

// ページナビゲーション表示
let pageNavi;

// トレーニング結果
let trainingData;

// 画面サイズスケーリング用
let scaleW = 1.0;
let scaleH = 1.0;


// =========================================================
//  Procedure
// =========================================================
function preload() {
  // 初期設定パラメータ
  jobjBase = loadJSON("./data/AppSettings.json");
  // カラーパレット
  colorTable = loadTable("./data/ColorChip156.csv", "header");  // 1行目はheader指定
}

function setup() {
  // 初期画面サイズ（MacBook Pro のディスプレイサイズをベースに設定）
  const PWidth = 1440;
  const PHeight = 900;  // 855だとDockに重ならない
  createCanvas(PWidth, PHeight);
  
  // ディスプレイサイズに合わせた表示倍率設定
  scaleW = displayWidth / PWidth;
  scaleH = displayHeight / PHeight;
  console.log("W:", displayWidth, "H:", displayHeight, "ScaleW:", scaleW, "ScaleH:", scaleH);
  
  rectMode(CORNER);
  
  // 初期設定パラメータ
  params = new SettingParameters();
  params.loadSettings();
  
  // create PickUpColor
  let hforig = 0;
  // パレット高さの設定
  if( params.SIZE_N45PALETTE ) {
    hforig = 200;
  } else {
    if( params.NUM_OF_COLORCHIP == 156 ) {
      hforig = int(params.NUM_OF_COLORCHIP * 2.5);  // 25pixels/行
    } else {
      hforig = params.NUM_OF_COLORCHIP * 3;         // 30pixels/行
    }
  }
  cPalette = new PickUpColor(70, 95, 400, hforig);
  cPalette.readColorInfo();
  
  // ページナビゲーション
  pageNavi = new PageNavi(scaleW, scaleH);
  
  // トレーニング結果保存
  trainingData = new TrainingData();
  
  // 画面遷移
  stateDisclaimer = new StateDisclaimer(scaleW, scaleH);
  stateQuerry1 = new StateQuerry1(scaleW, scaleH);
  stateQuerry2 = new StateQuerry2(scaleW, scaleH);
  stateQuerry3 = new StateQuerry3(scaleW, scaleH);
  stateQuerry4 = new StateQuerry4(scaleW, scaleH);
  
  // 画面遷移(Scene Manager)
  smgr = new SceneManager();
  smgr.addScene(SceneDisclaimer);
  smgr.addScene(SceneQuerry1);
  smgr.addScene(SceneQuerry2);
  smgr.addScene(SceneQuerry3);
  smgr.addScene(SceneQuerry4);
  smgr.showNextScene();
}

function draw() {
  background(255);
  //scale(scaleW, scaleH);
  
  // title
  fill(0);
  textSize(22);
  text(params.TEXT_TITLE, 550, 30);
  line(50, 40, 1390, 40);
  
  // 画面遷移(Scene Manager)
  smgr.draw();
}

function mouseClicked() {
  console.log("main: clicked", mouseButton);
  smgr.handleEvent("mouseClicked");
}

function mouseDragged() {
  console.log("main: dragged", mouseButton);
  smgr.handleEvent("mouseDragged");
}

function mousePressed() {
  console.log("main: pressed", mouseButton);
  smgr.handleEvent("mousePressed");
}


// =========================================================
//  Scene Description
// =========================================================
function SceneDisclaimer() {
  this.setup = function() {
    console.log("scene: Disclaimer setup");
    stateDisclaimer.init();
  }
  
  this.draw = function() {
    stateDisclaimer.drawState();
  }
  
  this.mousePressed = function() {
    console.log("scene: Disclaimer pressed");
    if( stateDisclaimer.decideNextScene() ) {
      stateDisclaimer.hideGuiObject();          // GUIオブジェクトを隠す
      this.sceneManager.showNextScene();        // 次の画面を表示
    }
  }
}

function SceneQuerry1() {
  this.setup = function() {
    console.log("scene: Querry1 setup");
    stateQuerry1.init();
  }
  
  this.draw = function() {
    stateQuerry1.drawState();
  }
  
  this.mousePressed = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry1 pressed ", msX, msY);
    // パレット押下処理
    stateQuerry1.mousePressedState(msX, msY);
    
    // PageNaviボタン処理
    //   StateBaseに移したいがSceneManagerが動作しないのでここに置く
    if( stateQuerry1.decidePrevScene() ) {
      stateQuerry1.hideGuiObject();
      this.sceneManager.showScene(SceneDisclaimer);
    }
    if( stateQuerry1.decideNextScene() ) {
      this.sceneManager.showNextScene();
    }
  }
}

function SceneQuerry2() {
  this.setup = function() {
    console.log("scene: Querry2 setup");
    stateQuerry2.init();
  }
  
  this.draw = function() {
    stateQuerry2.drawState();
  }
  
  this.mouseClicked = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry2 clicked ", msX, msY);
    // マウスクリック処理
    stateQuerry2.mouseClickedState(msX, msY);
  }
  
  this.mouseDragged = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry2 dragged ", msX, msY);
    // マウスドラッグ処理
    stateQuerry2.mouseDraggedState(msX, msY);
  }
  
  this.mousePressed = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry2 pressed ", msX, msY);
    // パレット押下処理
    stateQuerry2.mousePressedState(msX, msY);
    
    // PageNaviボタン処理
    //   StateBaseに移したいがSceneManagerが動作しないのでここに置く
    if( stateQuerry2.decidePrevScene() ) {
      this.sceneManager.showScene(SceneQuerry1);
    }
    if( stateQuerry2.decideNextScene() ) {
      this.sceneManager.showNextScene();
    }
  }
}

function SceneQuerry3() {
  this.setup = function() {
    console.log("scene: Querry3 setup");
    stateQuerry3.init();
  }
  
  this.draw = function() {
    stateQuerry3.drawState();
  }
  
  this.mouseClicked = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry3 clicked ", msX, msY);
    // マウスクリック処理
    stateQuerry3.mouseClickedState(msX, msY);
  }
  
  this.mouseDragged = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry3 dragged ", msX, msY);
    // マウスドラッグ処理
    stateQuerry3.mouseDraggedState(msX, msY);
  }
  
  this.mousePressed = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry3 pressed ", msX, msY);
    // パレット押下処理
    stateQuerry3.mousePressedState(msX, msY);
    
    // PageNaviボタン処理
    //   StateBaseに移したいがSceneManagerが動作しないのでここに置く
    if( stateQuerry3.decidePrevScene() ) {
      this.sceneManager.showScene(SceneQuerry2);
    }
    if( stateQuerry3.decideNextScene() ) {
      this.sceneManager.showNextScene();
    }
  }
}

function SceneQuerry4() {
  this.setup = function() {
    console.log("scene: Querry4 setup");
    stateQuerry4.init();
  }
  
  this.draw = function() {
    stateQuerry4.drawState();
  }
  
  this.mousePressed = function() {
    //let msX = round(mouseX/scaleW);
    //let msY = round(mouseY/scaleH);
    let msX = mouseX;
    let msY = mouseY;
    console.log("scene: Querry4 pressed ", msX, msY);
    // パレット押下処理
    stateQuerry4.mousePressedState(msX, msY);
    
    // PageNaviボタン処理
    //   StateBaseに移したいがSceneManagerが動作しないのでここに置く
    if( stateQuerry4.decidePrevScene() ) {
      stateQuerry4.hideGuiObject();
      this.sceneManager.showScene(SceneQuerry3);
    }
    // 先頭画面には戻さない
    //if( stateQuerry4.decideNextScene() ) {
    //  this.sceneManager.showNextScene();
    //}
  }
}

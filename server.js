// Color Training Web App Server

const express = require('express');
const app = express();
let path = require('path');
const port = 80;

// ルーティング設定
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/sketch_ColorTrainingJs/index.html'));
	console.log('someone access to sever');
});

// p5.jsファイルの置き場所指定
app.use(express.static('./sketch_ColorTrainingJs'));

// HTTPサーバ起動
app.listen(port, function() {
	console.log('listening at http://localhost:', port);
});

/**
 * Created by three on 15/10/22.
 */

'use strict';

var fs = require('hexo-fs');
var Promise = require('bluebird');
var process = require('child_process');

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var mermaidDiagramType = {
    gantt: 'gantt',
    flow: 'graph',
    sequence: 'sequenceDiagram'
};

hexo.extend.tag.register('mermaid', function (args, content) {

    return new Promise(function (resolve, reject) {
        var directory = './temp/';

        if (!fs.existsSync()) {
            try {
                fs.mkdirsSync(directory);

            } catch (e) {

            }
        }

        var diagramType = args[0];
        var data = [mermaidDiagramType[diagramType]];

        if(args==='gantt') {
            data.push('title ' + args[1])
        } else if(args==='graph') {
            data.length = 0;
            data.push(mermaidDiagramType[diagramType]+' ' + args[1])
        }

        data.push(content);
        data = data.join('\r\n');
        var path = directory + guid();
        var svgPath = path + '.svg';
        var pngPath = path + '.png';

        fs.writeFileSync(path+ '.mmd', data);

        var cmd = './node_modules/hexo-tag-gantt/node_modules/.bin/mermaid ' + path + '.mmd -o ' + directory + ' -s -p';

        process.exec(cmd, {setsid: false}, function (error, stdout, stderr) {
            console.log(stderr);
            console.log(stdout);
            console.log(error);
            if (error !== null) {
                console.log('exec error: ' + error);
                reject("<h3>gantt 生成失败</h3>")
            } else {
                var svg = fs.readFileSync(svgPath);
                resolve('<div style="overflow: scroll;">' + svg + '</div>');
                fs.unlink(path);
                fs.unlink(svgPath);
                fs.unlink(pngPath);
            }
        });

    }).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });

}, {async: true, ends: true});
/*
기능 : 태그별 포스트 목록 페이지 생성
구현 :
    1. 포스트 목록 폴더에서 파일 목록을 읽음
    2. 각 파일에서 태그 추출
    3. 추철한 태그가 collection path 에 파일로 있는지 확인
        3-1. 없으면 파일 생성
        3-2. 있으면 다음 단계로
 */
const fs = require('fs');
const path = require('path');

const template = `---
name: {{ tag }}
---`;

function exec(baseDir, collectionName) {
    const postDir = path.join(baseDir, '_posts');

    // 1.
    if (!fs.statSync(postDir).isDirectory()) {
        console.log(postDir, ' is not directory');
    }

    const posts = fs.readdirSync(postDir)
        .filter(filename => filename.match(/(.html|.md)$/i));

    console.log(posts);

    // 2.
    let tags = [];
    posts.forEach(filename => {
        const content = fs.readFileSync(path.join(postDir, filename));
        const tagStr = /tags\s*:\s*\[(.+?)\]/.exec(content.toString())[1];
        tagStr.split(',').map(tag => tag.trim()).forEach(tag => {
           tags.push(tag);
        })
    });

    console.log(tags);

    // 3.
    new Set(tags).forEach(tag => {
        const tagFilePath = path.join(baseDir, `_${collectionName}`, tag + '.html');

        if (fs.existsSync(tagFilePath)) {
            return;
        }

        fs.writeFileSync(tagFilePath, template.replace('{{ tag }}', tag));
    });
}

module.exports = exec;

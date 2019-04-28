const fs = require('fs-extra'),
    path = require('path');

module.exports = async (app, routesDir) => {
    //routes, 하위폴더에 있는 모든 .js 파일 불러온 후 라우팅
    const dirFiles = [{ name: 'routesDir', filePath: routesDir },];
    const routeFiles = [];

    while (dirFiles[0]) {
        const dirFile = await fs.readdir(dirFiles[0].filePath);

        dirFile.forEach(file => {
            const tmp = {
                name: file.split('.')[0],
                filePath: path.join(dirFiles[0].filePath, file.split('.')[0])
            }
            file.split('.')[1] ? routeFiles.push(tmp) : dirFiles.push(tmp);
        })

        dirFiles.splice(0, 1);
    }

    routeFiles.forEach(file => {
        const router = require(file.filePath);
        app[router.info.method.toLowerCase()](router.info.url, (req, res, next) => router.run(req, res, next))
    })
}
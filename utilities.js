import gunzipMaybe from 'gunzip-maybe';
import Progress    from 'progress';
import tarFs       from 'tar-fs';
import tar         from 'tar-stream';

function getFileName(entryName, virtualPath) {

    entryName = entryName.replace(/^\/+/, ``);

    for (let t = 0; t < virtualPath; ++t) {

        let index = entryName.indexOf(`/`);

        if (index === -1)
            return null;

        entryName = entryName.substr(index + 1);

    }

    return entryName;

}

export async function readFileFromArchive(fileName, buffer, {virtualPath = 0} = {}) {

    return new Promise((resolve, reject) => {

        let extractor = tar.extract();

        extractor.on(`entry`, (header, stream, next) => {

            if (getFileName(header.name, virtualPath) === fileName) {

                var buffers = [];

                stream.on(`data`, data => {
                    buffers.push(data);
                });

                stream.on(`error`, error => {
                    reject(error);
                });

                stream.on(`end`, () => {
                    resolve(Buffer.concat(buffers));
                });

            } else {

                stream.on(`end`, () => {
                    next();
                });

            }

            stream.resume();
        });

        extractor.on(`error`, error => {
            reject(error);
        });

        extractor.on(`finish`, () => {
            reject(new Error(`Couldn't find "${fileName}" inside the archive`));
        });

        let gunzipper = gunzipMaybe();
        gunzipper.pipe(extractor);

        gunzipper.on(`error`, error => {
            reject(error);
        });

        gunzipper.write(buffer);
        gunzipper.end();

    });

}

export async function readPackageJsonFromArchive(packageBuffer) {

    return await readFileFromArchive(`package.json`, packageBuffer, {virtualPath: 1});

}

export async function extractArchiveTo(packageBuffer, target, {virtualPath = 0} = {}) {

    return new Promise((resolve, reject) => {

        function map(header) {
            header.name = getFileName(header.name, virtualPath) || header.name;
            return header;
        }

        let gunzipper = gunzipMaybe();

        let extractor = tarFs.extract(target, { map });
        gunzipper.pipe(extractor);

        extractor.on(`error`, error => {
            reject(error);
        });

        extractor.on(`finish`, () => {
            resolve();
        });

        gunzipper.write(packageBuffer);
        gunzipper.end();

    });

}

export async function extractNpmArchiveTo(packageBuffer, target) {

    return await extractArchiveTo(packageBuffer, target, {virtualPath: 1});

}

export async function trackProgress(cb) {

    let pace = new Progress(`:bar :current/:total (:elapseds)`, {width: 80, total: 1});

    try {

        return await cb(pace);

    } finally {

        if (!pace.complete) {
            pace.update(1);
            pace.terminate();
        }

    }

}

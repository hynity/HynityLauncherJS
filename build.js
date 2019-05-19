const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'hynitylauncher',
        productName: 'Hynity Launcher',
        artifactName: '${productName}.${ext}',
        copyright: 'Copyright © 2018-2019 Daniel Scalzi - DarkScientist_ - Hynity',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ],
            icon: 'build/icon.ico'
        },
        nsis: {
            oneClick: false,
            perMachine: true,
            allowElevation: true,
            installerIcon: 'build/icon.ico',
            uninstallerIcon: 'build/icon.ico',
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games',
            icon: 'build/icon.icns'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'Daniel Scalzi - Hynity',
            vendor: 'Daniel Scalzi - Hynity',
            synopsis: 'Hynity Launcher',
            description: 'Le launcher officiel d\'Hynity !',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
})
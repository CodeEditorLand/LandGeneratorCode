
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

let validator = require('./validator');

/**
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionDisplayName = (generator, extensionConfig) => {
    let extensionDisplayName = generator.options['extensionDisplayName'];
    if (extensionDisplayName) {
        extensionConfig.displayName = extensionDisplayName;
        return Promise.resolve();
    }

    return generator.prompt({
        type: 'input',
        name: 'displayName',
        message: 'What\'s the name of your extension?',
        default: extensionConfig.displayName
    }).then(displayNameAnswer => {
        extensionConfig.displayName = displayNameAnswer.displayName;
    });
}

/**
 * Ask for extension id ("name" in package.json)
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionId = (generator, extensionConfig) => {
    let extensionName = generator.options['extensionName'];
    if (extensionName) {
        extensionConfig.name = extensionName;
        return Promise.resolve();
    }
    let def = extensionConfig.name;
    if (!def && extensionConfig.displayName) {
        def = extensionConfig.displayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    if (!def) {
        def = '';
    }

    return generator.prompt({
        type: 'input',
        name: 'name',
        message: 'What\'s the identifier of your extension?',
        default: def,
        validate: validator.validateExtensionId
    }).then(nameAnswer => {
        extensionConfig.name = nameAnswer.name;
    });
}

/**
 * Ask for extension description
* @param {import('yeoman-generator')} generator
* @param {Object} extensionConfig
*/
exports.askForExtensionDescription = (generator, extensionConfig) => {
    let extensionDescription = generator.options['extensionDescription'];
    if (extensionDescription) {
        extensionConfig.description = extensionDescription;
        return Promise.resolve();
    }

    return generator.prompt({
        type: 'input',
        name: 'description',
        message: 'What\'s the description of your extension?'
    }).then(descriptionAnswer => {
        extensionConfig.description = descriptionAnswer.description;
    });
}


exports.askForGit = (generator, extensionConfig) => {
    // if (['ext-command-ts', 'ext-command-js', 'ext-notebook-renderer'].indexOf(generator.extensionConfig.type) === -1) {
    //     return Promise.resolve();
    // }
    return generator.prompt({
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true
    }).then(gitAnswer => {
        extensionConfig.gitInit = gitAnswer.gitInit;
    });
}

exports.askForPackageManager = (generator, extensionConfig) => {
    // if (!['ext-command-ts', 'ext-command-js', 'ext-localization', 'ext-notebook-renderer'].includes(extensionConfig.type)) {
    //     return Promise.resolve();
    // }
    extensionConfig.pkgManager = 'npm';
    return generator.prompt({
        type: 'list',
        name: 'pkgManager',
        message: 'Which package manager to use?',
        choices: [
            {
                name: 'npm',
                value: 'npm'
            },
            {
                name: 'yarn',
                value: 'yarn'
            }
        ]
    }).then(pckgManagerAnswer => {
        extensionConfig.pkgManager = pckgManagerAnswer.pkgManager;
    });
}
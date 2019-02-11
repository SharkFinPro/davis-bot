"use strict";
module.exports = {
    help: {
        enabled: true,
        description: 'Help',
        type: 'general',
        command: 'library/general/help.js',
        args: ''
    },
    cat: {
        enabled: true,
        description: 'Shows a random cat picture',
        type: 'general',
        command: 'library/general/cat.js',
        args: ''
    },
    dog: {
        enabled: true,
        description: 'Shows a random dog picture',
        type: 'general',
        command: 'library/general/dog.js',
        args: ''
    },
    userinfo: {
        enabled: true,
        description: 'Display info about a specified user',
        type: 'general',
        command: 'library/general/userinfo.js',
        args: ['user']
    },
    serverinfo: {
        enabled: true,
        description: 'Display info about the server',
        type: 'general',
        command: 'library/general/serverinfo.js',
        args: ''
    },
    play: {
        enabled: true,
        description: 'Plays a song from YT',
        type: 'music',
        command: 'library/music/play.js',
        args: ['url']
    },
    yt: {
        enabled: true,
        description: 'Searches songs to play on YT',
        type: 'music',
        command: 'library/music/yt.js',
        args: ['query']
    },
    skip: {
        enabled: true,
        description: 'Skips current song',
        type: 'music',
        command: 'library/music/skip.js',
        args: ''
    },
    pause: {
        enabled: true,
        description: 'Pauses current song',
        type: 'music',
        command: 'library/music/pause.js',
        args: ''
    },
    queue: {
        enabled: true,
        description: 'Displays queue',
        type: 'music',
        command: 'library/music/queue.js',
        args: ''
    },
    resume: {
        enabled: true,
        description: 'Resumes current song',
        type: 'music',
        command: 'library/music/resume.js',
        args: ''
    },
    volume: {
        enabled: true,
        description: 'Sets the current volume',
        type: 'music',
        command: 'library/music/volume.js',
        args: ['volume']
    },
    clear: {
        enabled: true,
        description: 'Clears messages',
        type: 'mod',
        command: 'library/mod/clear.js',
        args: ['num']
    },
    clearqueue: {
        enabled: true,
        description: 'Clears the queue.',
        type: 'mod',
        command: 'library/mod/clearQueue.js',
        args: ''
    }
};

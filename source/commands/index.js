"use strict";
module.exports = {
    help: {
        enabled: true,
        description: 'Shows list of commands',
        type: 'general',
        command: 'library/general/help.js',
        args: ''
    },
    calendar: {
        enabled: true,
        description: 'Shows monthly calender',
        type: 'general',
        command: 'library/general/calender.js',
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
    woah: {
        enabled: true,
        description: 'Woah there, SCOUT!',
        type: 'general',
        command: 'library/general/woah.js',
        args: ''
    },
    play: {
        enabled: false,
        description: 'Plays a song from YT',
        type: 'music',
        command: 'library/music/play.js',
        args: ['url']
    },
    yt: {
        enabled: false,
        description: 'Searches songs to play on YT',
        type: 'music',
        command: 'library/music/yt.js',
        args: ['query']
    },
    skip: {
        enabled: false,
        description: 'Skips current song',
        type: 'music',
        command: 'library/music/skip.js',
        args: ''
    },
    pause: {
        enabled: false,
        description: 'Pauses current song',
        type: 'music',
        command: 'library/music/pause.js',
        args: ''
    },
    queue: {
        enabled: false,
        description: 'Displays queue',
        type: 'music',
        command: 'library/music/queue.js',
        args: ''
    },
    resume: {
        enabled: false,
        description: 'Resumes current song',
        type: 'music',
        command: 'library/music/resume.js',
        args: ''
    },
    volume: {
        enabled: false,
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
        enabled: false,
        description: 'Clears the queue.',
        type: 'mod',
        command: 'library/mod/clearQueue.js',
        args: ''
    }
};

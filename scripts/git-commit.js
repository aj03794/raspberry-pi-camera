const { exec } = require('child_process')
const { cwd } = require('process')

const doGitCommit = () => new Promise((resolve, reject) => {
    exec(`git commit -am 'CI'`, { cwd: cwd()}, (err, stdout, stderr) => {
        if (err) {
            resolve()
        }
        resolve()
    })
})

doGitCommit()
.then(() => {
    return
})
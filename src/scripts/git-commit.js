import { exec } from 'child_process'
import { cwd } from 'process'

export const doGitCommit = () => new Promise((resolve, reject) => {
    exec(`git commit -am 'New release'`, { cwd: cwd()}, (err, stdout, stderr) => {
        if (err) {
            resolve()
        }
        resolve()
    })
})
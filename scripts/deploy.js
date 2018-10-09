const resolve = require('path').resolve
const publishRelease = require('publish-release')

const resolvePath = resolve
const repo = 'raspberry-pi-camera'
const owner = 'aj03794'
const version = require('../package.json').version


const publishGithubArtifact = () => {

    const opts = createOpts()

    console.log({
        opts
    })

    return publishRelease(opts, (err, release) => {
        if (err) {
            console.error({
                method: `publishRelease`,
                msg: `Error publishing ${repo}`,
                err
            })
            return process.exit(1)
        }
        console.log({
            msg: `${repoName} version ${version} release created successfully`
        })
    })
}

const createOpts = () => {
	return {
        token: process.env.GITHUB_OAUTH_TOKEN,
        owner: 'aj03794',
        repo: repo,
        tag: version,
        name: repo,
        draft: false,
        prerelease: false,
        reuseRelease: true,
        reuseDraftOnly: true,
        skipAssetsCheck: false,
        skipDuplicatedAssets: false,
        editRelease: false,
        deleteEmptyTag: false,
        assets: [resolvePath(__dirname, '../', 'raspberry-pi-camera.zip')],
        target_commitish: 'master'
	}
}

publishGithubArtifact()
module.exports = {
  branches: ['master', 'main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',   

    [
      '@semantic-release/git',   
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
  analyzeCommits: {
    preset: 'conventionalcommits',
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'BREAKING'],
    },
    releaseRules: [
      { type: 'fix', release: 'patch' },
      { type: 'feat', release: 'minor' },
      { type: 'BREAKING CHANGE', release: 'major' },
      { type: 'wip', release: 'none' }, 
      {
        message: /^(fix|feat|BREAKING CHANGE):/, 
        release: (message) => {
          const type = message.match(/^(fix|feat|BREAKING CHANGE):/)[1];
          switch (type) {
            case 'fix':
              return 'patch';
            case 'feat':
              return 'minor';
            case 'BREAKING CHANGE':
              return 'major';
            default:
              return 'none'; 
          }
        },
      },
      { type: 'perf', release: 'patch' },
      { type: 'revert', release: 'patch' },
      { type: 'chore', release: 'patch' },
      { type: 'docs', release: 'patch' },
      { type: 'style', release: 'patch' },
      { type: 'refactor', release: 'patch' },
      { type: 'test', release: 'patch' },
      { type: 'build', release: 'patch' },
    ],
  },
  generateNotes: {
    preset: 'conventionalcommits',
  },
  github: {
    token: process.env.GITHUB_TOKEN,
  },
};

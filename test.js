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
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        repositoryUrl: 'https://github.com/Tech-talks-hitesh-pod/Semantic-release-demo.git'   

      },
    ],
  ],
  analyzeCommits: {
    preset: 'conventional-commits',
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'BREAKING'],
    },
    releaseRules: [
      { type: 'fix', release: 'patch' },
      { type: 'feat', release: 'minor' },
      { type: 'BREAKING CHANGE', release: 'major' },
      // Consider PR title analysis if your PR title format is consistent:
      { type: 'wip', release: 'none' }, // Skip releases for WIP PRs
      {
        /* Analyze PR title for keywords (adjust based on your PR format): */
        message: /^(fix|feat|BREAKING CHANGE):/, // Match PR title starting with keywords
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
              return 'none'; // No release for other types
          }
        },
      },
      { type: 'perf', release: 'patch' },
      { type: 'revert', release: 'patch' },
      { type: 'chore', release: 'patch' },
      { type: 'docs', release: 'patch' },
      { type: 'style', release: 'patch' },
      { type: 'refactor', release: 'patch' },
      { type:   
 'test', release: 'patch' },
      { type: 'build', release: 'patch'   
 },
    ],
  },
  generateNotes: {
    preset: 'conventional-commits',
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    releaseNotes: {
      draft: false,
    },
  },
};

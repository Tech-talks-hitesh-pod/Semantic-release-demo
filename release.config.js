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
  };
const repositories = {
  hasSubFields: false,
  resolve: async (repositories) => {
    if (!Array.isArray(repositories)) return null

    const records = await Promise.all(
      repositories.filter(Boolean).map(async (repo) => {
        try {
          const res = await fetch('https://api.github.com/repos/' + repo, {
            headers: {
              accept: 'application/vnd.github+json',
              ...(process.env.GITHUB_TOKEN && {
                authorization: 'token ' + process.env.GITHUB_TOKEN,
              }),
            },
          })

          if (!res.ok) {
            console.log('Failed to fetch repo ' + repo + ': ' + res.status)
            return null
          }

          const json = await res.json()

          return {
            name: json.name,
            owner: json.owner.login,
            url: json.html_url,
            description: json.description,
            language: json.language,
            topics: json.topics,
            stars: json.stargazers_count,
            forks: json.forks_count,
          }
        } catch (error) {
          console.log('Failed to fetch repo ' + repo, error)
          return null
        }
      })
    )

    return { records: records.filter(Boolean) }
  },
}

export default repositories

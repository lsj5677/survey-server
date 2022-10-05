// pm2 run setting file
// pm2 list로 background에서 돌아가는 리스트 확인 가능

module.exports = {
  apps: [{
    name: 'survey-server',
    script: 'dist/main.js',

    // 각 실행환경 환경변수
    env: {
      PORT: 3001,
      NODE_ENV: 'local'
    },
    env_develop: {
      PORT: 3001,
      NODE_ENV: 'dev',
    },
    env_production: {
      PORT: 3001,
      NODE_ENV: 'prod',
    }
  }]
}
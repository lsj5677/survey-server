# FROM origin
ARG DOCKER_NAME=survey-server-origin
FROM 420829132772.dkr.ecr.ap-northeast-2.amazonaws.com/${DOCKER_NAME}:latest

# Copy Project
# ec2안에 있는 경로
WORKDIR /usr/src/survey-server
COPY . .

# Build Project
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install
RUN npm run build

# Start Script
COPY start.sh /root/start.sh
RUN ["chmod", "+x", "/root/start.sh"]
ENTRYPOINT /root/start.sh

RUN echo 안녕하세요

# 포트 열기
EXPOSE 3000
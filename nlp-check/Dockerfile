#FROM ubuntu:latest
#LABEL maintainer="roseline124 <guseod24@gmail.com>"
#
#ENV LANG=C.UTF-8
#ENV DEBIAN_FRONTEND=noninteractive
#RUN apt-get update && \
#  apt-get install -y --no-install-recommends tzdata g++ curl
#
## install java
#RUN apt-get install -y openjdk-8-jdk
#ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"
#
## install python
#RUN apt-get install -y python3-pip python3-dev
#RUN cd /usr/local/bin && \
#  ln -s /usr/bin/python3 python && \
#  ln -s /usr/bin/pip3 pip && \
#  pip install --upgrade pip
#
## apt clean
#RUN apt-get clean && \
#  rm -rf /var/lib/apt/lists/*
#
## copy resources
#COPY . .
#
## install python package
#RUN pip install -r requirements.txt
#
#EXPOSE 5050
#
#CMD ["python", "app.py"]

# 기반이 될 이미지 선택 (Ubuntu 20.04 사용 예시)
FROM ubuntu:20.04

# Java 설치를 위해 패키지 관리자 업데이트 및 JDK 설치
RUN apt-get update && apt-get install -y default-jdk

# Python 및 필요한 라이브러리 설치
RUN apt-get install -y python3-pip python3-dev

# 작업 디렉토리 생성
RUN mkdir -p /nlp
WORKDIR /nlp

# 필요한 Python 패키지들 설치
COPY . /nlp/
RUN pip3 install --no-cache-dir -r requirements.txt

# 컨테이너에서 실행될 명령어 지정
CMD ["python3", "app.py"]
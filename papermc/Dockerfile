FROM openjdk:19-alpine

ARG MAVEN_VERSION=3.8.7
ARG BASE_URL=https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries

ENV MC_VERSION="1.18.2" \
    PAPER_BUILD="latest" \
    MC_RAM="1G" \
    JAVA_OPTS=""

RUN apk add --no-cache wget curl jq git && \
    mkdir -p /usr/share/maven /usr/share/maven/ref && \
    curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz && \
    tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 && \
    rm -f /tmp/apache-maven.tar.gz && \
    ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

WORKDIR /papermc
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

COPY bukkit.yml .
COPY ops.json .
COPY server.properties .

CMD ["sh", "/papermc/entrypoint.sh"]

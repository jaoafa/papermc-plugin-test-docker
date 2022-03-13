FROM openjdk:17-alpine

ARG MAVEN_VERSION=3.8.5
ARG BASE_URL=https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries

# Environment variables
ENV MC_VERSION="1.18.2" \
    PAPER_BUILD="latest" \
    MC_RAM="1G" \
    JAVA_OPTS=""

ADD papermc/papermc.sh .
RUN apk add --no-cache wget curl jq git
RUN mkdir /papermc

RUN mkdir -p /usr/share/maven /usr/share/maven/ref
RUN curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz
RUN tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1
RUN rm -f /tmp/apache-maven.tar.gz
RUN ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

ADD data/bukkit.yml /papermc
ADD data/ops.json /papermc
ADD data/server.properties /papermc

CMD ["sh", "./papermc.sh"]

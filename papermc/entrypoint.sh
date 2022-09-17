#!/bin/bash

urlPrefix=https://papermc.io/api/v2/projects/paper
if [ "${MC_VERSION}" = "latest" ]; then
    # Get the latest MC version
    MC_VERSION=$(wget -qO - $urlPrefix | jq -r '.versions[-1]')
fi
urlPrefix=${urlPrefix}/versions/${MC_VERSION}
if [ "${PAPER_BUILD}" = "latest" ]; then
      # Get the latest build
      PAPER_BUILD=$(wget -qO - "$urlPrefix" | jq '.builds[-1]')
fi

JAR_NAME=papermc-${MC_VERSION}-${PAPER_BUILD}.jar

if [ ! -e "${JAR_NAME}" ]
  then
    rm -f ./*.jar
    wget -q "${urlPrefix}/builds/${PAPER_BUILD}/downloads/paper-${MC_VERSION}-${PAPER_BUILD}.jar" -O "$JAR_NAME"
    if [ ! -e eula.txt ]
    then
      java -jar "${JAR_NAME}"
      sed -i 's/false/true/g' eula.txt
    fi
fi

# Start server
# shellcheck disable=SC2086
exec "java" "-server" "-Xms${MC_RAM}" "-Xmx${MC_RAM}" ${JAVA_OPTS} "-jar" "${JAR_NAME}" "nogui"
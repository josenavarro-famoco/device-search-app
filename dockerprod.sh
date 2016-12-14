#!/bin/bash

# APP
CONTAINER_NAME=${CONTAINER_NAME:='device-search'}
IMAGE_NAME=${IMAGE_NAME:='device-search'}

# NODE
NODE_ENV=${NODE_ENV:='production'}

# FMS
FMS_CONTAINER_NAME=${FMS_CONTAINER_NAME:="fms-django"}


function docker_container_exists {
    docker ps -a --format "{{.Names}}" | grep "^$1$" > /dev/null
    return $?
}

function docker_container_running {
    local state=$(docker inspect -f "{{.State.Running}}" $1 2> /dev/null)
    [[ "$state" == "true" ]] && return 0 || return 1
}

# Check if FMS container exists
docker_container_exists ${FMS_CONTAINER_NAME} ]] \
    || { echo "FMS container does not exist"; exit 1; }

# Check if FMS container is running
docker_container_running ${FMS_CONTAINER_NAME} \
    || { echo -n "Starting... "; docker start ${FMS_CONTAINER_NAME}; }

# If App container exists, suggest to remove it
if docker_container_exists ${CONTAINER_NAME}
then
    read -p "Container ${CONTAINER_NAME} exists, remove it? (y/n): " -n 1 -r
    [[ ! ${REPLY} =~ ^[Yy]$ ]] && exit 1
    echo
    echo -n "Stopping... "
    docker stop ${CONTAINER_NAME}
    echo -n "Removing... "
    docker rm ${CONTAINER_NAME}
fi

# Create and run the docker container
echo "Starting..."
docker run -itd \
    --link "${FMS_CONTAINER_NAME}:${FMS_CONTAINER_NAME}" \
    --name "${CONTAINER_NAME}" \
    -p 3001:80 \
    -e NODE_ENV=${NODE_ENV} \
    ${IMAGE_NAME} run start:container

echo "Server running in port 3001"

@echo off 

if [%1]==[] (
    echo "Usage: build.cmd <version>"
) else (
    docker build -t saramorillon/mini-planning .
    docker image tag saramorillon/mini-planning saramorillon/mini-planning:%1
    docker push -a saramorillon/mini-planning
)

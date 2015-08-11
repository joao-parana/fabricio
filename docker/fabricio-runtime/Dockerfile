FROM fabricio/nodejs-0.12

RUN mkdir /opt/fabricio
ONBUILD ADD fabricio /opt/fabricio/
ONBUILD ADD fabfile /tmp

WORKDIR /opt/fabricio

EXPOSE 1337

ENTRYPOINT ["npm", "start"]

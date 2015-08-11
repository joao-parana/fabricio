FROM ubuntu

#install fabric
RUN apt-get update -y && apt-get install -y wget fabric git

#install nodejs 0.12
RUN wget http://nodejs.org/dist/v0.12.1/node-v0.12.1-linux-x64.tar.gz
RUN tar xvf node-v0.12.1-linux-x64.tar.gz
RUN mv node-v0.12.1-linux-x64 /opt/node
RUN echo "export PATH=\$PATH:/opt/node/bin" >> ~/.bashrc
ENV PATH $PATH:/opt/node/bin

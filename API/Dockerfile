FROM node
WORKDIR /App
ADD . /App
RUN npm install
ENV PORT 3000
ENV IP "192.168.0.0"
CMD ["node","index.js"]
# pull the base image
FROM node:18.16-alpine

# set the working direction
WORKDIR /app

# Copy the dependency files and install them
COPY package.json ./

RUN yarn install

# add app
COPY . .

# start app
CMD ["yarn", "start"]

# We indicate on which port Nginx will work
EXPOSE "${REACT_APP_API_PORT}"